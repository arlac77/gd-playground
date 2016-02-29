/* jslint node: true, esnext: true */
"use strict";


const levelup = require('levelup'),
  levelws = require('level-ws');


const db = levelws(levelup('./mydb'));

const ws = db.createWriteStream({
  //keyEncoding: 'binary',
  valueEncoding: 'utf8'
});

ws.on('error', err => {
  console.log('Oh my!', err);
});
ws.on('close', () => {
  console.log('Stream closed');
});


//for (let i = 0; i < 1000000; i++) {
/*
  var buffer = new ArrayBuffer(4);
  var int32View = new Int32Array(buffer);
  int32View[0] = 0;
*/
/*
  ws.write({
    key: i,
    value: `Yuri Irsenovich Kim ${i}`
  });
}

ws.end();
*/

/*
var buffer = new ArrayBuffer(4);
var int32View = new Int32Array(buffer);
int32View[0] = 100;
*/

let i = 16;

db.get(i, (err, value) => {
  if (err) return console.log('Ooops!', err);

  console.log(`${i}=${value}`);
});
