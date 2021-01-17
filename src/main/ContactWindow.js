import { app, BrowserWindow, ipcMain, screen, remote } from 'electron'
const path = require('path');
const url = require('url');
const contactURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080/#/selectcontact'
  : `file://${__dirname}/index.html/#/selectcontact`;
export const ContactWindow = (link, role) => {
   let contactWindow = new BrowserWindow({
        height: 600,
        useContentSize: true,
        width: 400,
        frame: false, // 无边框窗口
        movable: true, // 可拖动
        resizable: false, //
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true,
        },
    });
    contactWindow.webContents.once('dom-ready', () => {
        contactWindow.webContents.closeDevTools();
    });
    contactWindow.on('closed', () => {
        contactWindow = null;
    });

    contactWindow.once('ready-to-show', () => {
        contactWindow.hide();
        contactWindow.center();
    })

    const loadUrl = url.format({
        pathname: path.resolve(app.getAppPath(), 'dist/electron', 'index.html'),
        protocol: 'file:',
        slashes: true
      });
    contactWindow.loadURL(contactURL);
    contactWindow.hide();
    return contactWindow;
}

export const contactWinShow = (win) => {
    win.show();
    win.center();
    win.focus();
    win.setAlwaysOnTop();
}

export const contactWinHide = () => {
    win.hide();
}
