const electron = require('electron');
const url = require('url')
const path = require('path')
const {app, BrowserWindow, Menu} = electron;
const { ipcMain } = require('electron')
const fs = require('fs');

//importing functions
const sysMon = require('./sysMon.js')
let mainController;



app.on('ready', () => {

    mainController = new BrowserWindow({

    width:800,
    height:600,
    minWidth:400,
    maxWidth:1920,
    minHeight:300,
    maxHeight:1080,
    backgroundColor: "#3c3c44",
    webPreferences:{
      nodeIntegration:true,
      contextIsolation:false
    }
  });

  //load HTML
  mainController.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes:true
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
        accelerator: process.platform == 'darwin' ? 'command+Q' :'ctrl+Q',
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
