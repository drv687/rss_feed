'use strict';

const electron = require('electron')
const {app, BrowserWindow} = electron
const notifier = require("node-notifier");//Add notifier function 
var onError = function(err,response){
    console.error(err,response);
};


//Quit when all the windows are closed.
app.on('window-all-closed', function(){
	if(process.platform !='darwin'){
		app.quit();
	}
});
app.on('ready', function(){
	//Create browser window.
	let theWindow = new BrowserWindow({width: 960, height: 600});
	//Load index.html
	theWindow.loadURL('file://' +__dirname + '/index.html');
	theWindow.openDevTools() //Opens dev tools
	theWindow.on('closed', function(){
		theWindow = null;
	});
});
