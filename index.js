/* jslint node: true, esnext: true */
'use strict';


const levelup = require('levelup'),
  levelws = require('level-ws');

const w = false;

if (w) {
  const db = levelws(levelup('./my.levelup'));

  const ws = db.createWriteStream({
    keyEncoding: 'binary',
    valueEncoding: 'utf8'
  });

  ws.on('error', err => console.error('Oh my!', err));
  ws.on('close', () => console.log('Stream closed'));

  const version = 6;
  const chunkSize = 1000000;
  const keyLength = 4 + 4;
  let b0 = new Buffer(keyLength * chunkSize);
  let start = 0;

  for (let i = 0; i < 1000000; i++) {
    const b = b0.slice(start, start + keyLength);
    start += keyLength;

    if (start >= chunkSize) {
      start = 0;
      b0 = new Buffer(keyLength * chunkSize);
    }

    b.writeInt32BE(i);
    b.writeInt32BE(version, 1);

    if (i % 100000 === 0) {
      console.log(i);
    }
    ws.write({
      key: b,
      value: `Yuri Irsenovich Kim ${i} ${version}`
    });
  }

  ws.end();
  console.log('end called...');
} else {
  const db = levelup('./my.levelup');

  db.createReadStream({
      keyEncoding: 'binary'
    })
    .on('data', data => console.log(data.key.readInt32BE(0), data.key.readInt32BE(1), data.value))
    .on('error', err => console.error('Oh my!', err))
    .on('close', () => console.log('Stream closed'))
    .on('end', () => console.log('Stream closed'));
}
