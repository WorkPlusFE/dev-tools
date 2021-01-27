import { app, BrowserWindow, ipcMain, screen, remote } from 'electron'
const path = require('path');
const url = require('url');
const contactURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080/#/imageshow'
  : `file://${__dirname}/index.html/#/imageshow`;
export const ImageShowWindow = (link, role) => {
   let imageShowWindow = new BrowserWindow({
        height: 600,
        useContentSize: true,
        width: 800,
        frame: false, // 无边框窗口
        movable: true, // 可拖动
        resizable: false, //
        webPreferences: {
            devTools: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true,
            webSecurity: false
        },
        show: false,
        fullscreenable: false,
    });
    imageShowWindow.webContents.once('dom-ready', () => {

    });
    imageShowWindow.on('closed', () => {
        
    });
    imageShowWindow.on('close', (event) => {
        imageShowWindow.hide();
        event.preventDefault();
    });

    imageShowWindow.once('ready-to-show', () => {
        // imageShowWindow.hide();
        // imageShowWindow.center();
    })

    const loadUrl = url.format({
        pathname: path.resolve(app.getAppPath(), 'dist/electron', 'index.html'),
        protocol: 'file:',
        slashes: true
      });
      imageShowWindow.loadURL(contactURL);
      imageShowWindow.hide();
    return imageShowWindow;
}

export const imageShowWindowShow = (win) => {
    win.show();
    win.center();
    win.focus();
    win.setAlwaysOnTop();
}

