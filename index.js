/* jslint node: true, esnext: true */
'use strict';

const levelup = require('levelup'),
  levelws = require('level-ws');


const NUMBER_OF_ENTRIES = 100000;
const REPORT_NUMBER = 10000;
const VERSIONS_NUMBER = 2;

const mydb = levelup('./my.levelup');

const keyLength = 4 + 4;
const chunkSize = 1000;

const w = false;

if (w) {
  const db = levelws(mydb);

  const ws = db.createWriteStream({
    keyEncoding: 'binary',
    valueEncoding: 'utf8'
  });

  ws.on('error', err => console.error('Oh my!', err));
  ws.on('close', () => console.log('Stream closed'));

  for (let version = 0; version < VERSIONS_NUMBER; version++) {
    //const version = 6;
    let b0 = new Buffer(keyLength * chunkSize);
    let start = 0;

    for (let i = 0; i < NUMBER_OF_ENTRIES; i++) {
      const b = b0.slice(start, start + keyLength);
      start += keyLength;

      if (start >= chunkSize) {
        start = 0;
        b0 = new Buffer(keyLength * chunkSize);
      }

      b.writeInt32BE(i);
      b.writeInt32BE(version, 1);

      if (i % REPORT_NUMBER === 0) {
        console.log(`${version} ${i}`);
      }

      ws.write({
        key: b,
        value: `Name ${i} ${version}`
      });
    }
  }

  ws.end();
  console.log('end called...');
} else {
  let buf = new Buffer(keyLength);
  buf.writeInt32BE(100000, 0);
  buf.writeInt32BE(0, 0);

  mydb.get(buf, (error, data) => {
    console.log(data);
  });

  /*
    mydb.createReadStream({
        keyEncoding: 'binary',
        valueEncoding: 'utf8'
      })
      .on('data', data => console.log(data.key.readInt32BE(0), data.key.readInt32BE(1), data.value))
      .on('error', err => console.error('Oh my!', err))
      .on('close', () => console.log('Stream closed'))
      .on('end', () => console.log('Stream closed'));
      */
}
