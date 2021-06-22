const electron = require('electron');
const url = require('url')
const path = require('path')
const {app, BrowserWindow, Menu} = electron;
const { ipcMain } = require('electron')
const fs = require('fs');

//importing functions
const sysMon = require('./sysMon.js')

let mainController;

//Listen for app to be ready
app.on('ready', function(){
  //Create new Window
  mainController = new BrowserWindow({
    webPreferences:{
      nodeIntegration:true,
      contextIsolation:false
    }
  });
  //Load html into Window
  mainController.loadURL(url.format({
    pathname: path.join(__dirname, 'mainController.html'),
    protocol: 'file:',
    slashes: true
  }));
  //mainController.openDevTools()

  //Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Insert Menu
  Menu.setApplicationMenu(mainMenu);

  sysMon();
});

//Create menu template
const mainMenuTemplate = [
  {
    label : 'File',
    submenu:[
      {
        label: 'Save Monitoring Data',
      },
      {
        label: 'Quit',
        click(){
          app.quit();
        }
      }
    ],
  },
  {
    label : 'View',
    submenu:[
      {
        label: 'Home',
        click(){
          mainController.webContents.send('show-home')
        }
      },
      {
        label: 'Driver Info',
        click(){
          mainController.webContents.send('show-driverWindow')
        }
      }
    ]
  }
];
