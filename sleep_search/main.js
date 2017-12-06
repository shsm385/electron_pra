'use strict';

const nodeStatic = require('node-static');
const electron = require("electron");
const twitter = require("twitter");
const Datastore = require('nedb');
const CronJob = require("cron").CronJob;

const db = new Datastore({
  filename: 'date.db',
  autoload: true
});
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const file = new nodeStatic.Server(__dirname + "/web/");
let mainWindow;

// const startTime = getDate() + getTime();
// db.insert({first: startTime});

new CronJob('00 59 23 * * 1-5', () => {
  console.log('Hello');
}, null, true);

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(12345);

const client = new twitter({
  consumer_key: 'P2fdGQlfg99fYcKGjW60BXpwz',
  consumer_secret:'uBDqvkOJeNmC5u4XL8hQdZdMVC4PgItWSBbJkSPz1o5LdwLKxj',
  access_token_key: '923019016255324160-oz51qbDLhiOiywbfvC8UGIK3f65z4K2',
  access_token_secret: 'CicH8Pt4Ufxy2xg7gvH8UH5DudrTcL7IJ8P98NHdciTlh'
});

function comeTweet(){
  const params = {screen_name: 'nodejs'};
  let time = getTime();
  let date = getDate() + time;

  client.post('statuses/update',
    {status: 'asfi君がおそらく研究をはじめました.' + " at " + time},
      function(error, tweet, response) {
        if (!error) {
          db.insert({start: date});
          // db.find().sort({ date: -1 }).limit(10).exec(function (err, data) {console.log(data);});
        }else{
            console.log("エラー");
        }
    });
}

function sleepTweet(){
  const params = {screen_name: 'nodejs'};
  let time = getTime();
  let date = getDate() + time;

  client.post('statuses/update',
    {status: 'アスフィー君がおそらく研究を中断しました.' + " at " + time},
      function(error, tweet, response) {
        if (!error) {
            db.insert({stop: date});
            // db.find().sort({ date: -1 }).limit(10).exec(function (err, data) {console.log(data);});
        }else{
            console.log("エラー");
        }
    });
}

app.on('window-all-closed', function(){
  if(process.platform != 'darwin'){
    app.quit();
  }
});

app.on('ready', function(){
  electron.powerMonitor.on('suspend', () => {
    console.log('suspend');
    // sleepTweet();
    mainWindow.webContents.send('asynchronous-reply', 'suspend');
  });


  electron.powerMonitor.on('resume', () => {
    console.log('resume');
    // comeTweet();
    // getTimeDiff();
  });

  createWindow();

  mainWindow.loadURL('http://localhost:12345/index.html');

  mainWindow.on('closed',function(){
    mainWindow = null;
  });
});



function createWindow(){
  mainWindow = new BrowserWindow({
    width:0,
    height:0
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
}


function getTime(){
  const date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  let time = hour+ ":" + minute + ":" + second;
  return time;
}

function getDate(){
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let day = date.getDate();

  let res = year + "/" + month + "/" + day + " ";
  return res;
}

function getTimeDiff(){
  let times = [];
  let strBase = "2017/12/5 ";
  let regexp = new RegExp(strBase + '(.*?)', 'g');

  db.find(0,{start:1, _id:0}).exec(function(err,docs){
    console.log(docs.length());
  });

  // db.find({$or: [{start:{ $exists: true }}, {stop:{ $exists: true }}] }).exec(function(err,date){
  //   console.log(date);
  //
  // });
}

getTimeDiff();
