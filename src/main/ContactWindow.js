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
            devTools: true,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true,
        },
    });
    contactWindow.webContents.once('dom-ready', () => {
    });
    contactWindow.on('closed', () => {

    });
    contactWindow.on('close', (event) => {
        contactWindow.hide();
        event.preventDefault()
    })

    contactWindow.once('ready-to-show', () => {
        contactWindow.center();
    })
    contactWindow.loadURL(contactURL);
    contactWindow.hide();
    contactWindow.webContents.closeDevTools();
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
