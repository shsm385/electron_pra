'use strict';

const electron = require("electron");
const twitter = require("twitter");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function comeTweet(){
  var client = new twitter({
    consumer_key: 'P2fdGQlfg99fYcKGjW60BXpwz',
    consumer_secret:'uBDqvkOJeNmC5u4XL8hQdZdMVC4PgItWSBbJkSPz1o5LdwLKxj',
    access_token_key: '923019016255324160-oz51qbDLhiOiywbfvC8UGIK3f65z4K2',
    access_token_secret: 'CicH8Pt4Ufxy2xg7gvH8UH5DudrTcL7IJ8P98NHdciTlh'
  });

  var params = {screen_name: 'nodejs'};

  client.post('statuses/update',
    {status: 'asfi君がおそらく研究をはじめました.'},
      function(error, tweet, response) {
        if (!error) {
            console.log(tweet)
        }
    });
}

function sleepTweet(){
  var client = new twitter({
    consumer_key: 'P2fdGQlfg99fYcKGjW60BXpwz',
    consumer_secret:'uBDqvkOJeNmC5u4XL8hQdZdMVC4PgItWSBbJkSPz1o5LdwLKxj',
    access_token_key: '923019016255324160-oz51qbDLhiOiywbfvC8UGIK3f65z4K2',
    access_token_secret: 'CicH8Pt4Ufxy2xg7gvH8UH5DudrTcL7IJ8P98NHdciTlh'
  });

  var params = {screen_name: 'nodejs'};

  client.post('statuses/update',
    {status: 'アスフィー君がおそらく研究を中断しました.'},
      function(error, tweet, response) {
        if (!error) {
            console.log(tweet)
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
    console.log(getData());
    sleepTweet();
    mainWindow.webContents.send('asynchronous-reply', 'suspend');
  })


  electron.powerMonitor.on('resume', () => {
    console.log('resume');
    console.log(getData());
    comeTweet();
  })

  createWindow();

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


function getData(){
  var jikan= new Date();
  var hour = jikan.getHours();
  var minute = jikan.getMinutes();
  var second = jikan.getSeconds();

  var text = hour+":"+minute+":"+second;
  return text;
}
