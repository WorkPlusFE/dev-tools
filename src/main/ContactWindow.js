import { app, BrowserWindow, ipcMain, screen ,remote} from 'electron'
const path = require('path');
const url = require('url');
export const ContactWindow = (link,role) => {
   let contactWindow = new BrowserWindow({
        height:600,
        useContentSize: true,
        width:400,
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
        
    });
    contactWindow.on('closed', () => {
         otherWindow = null;
    });

    contactWindow.once('ready-to-show', () => {
        this.imageWin.hide();
        this.imageWin.center();
    })

    const loadUrl = url.format({
        pathname: path.resolve(app.getAppPath(), 'dist/electron', 'index.html'),
        protocol: 'file:',
        slashes: true
      });
    contactWindow.loadURL(`file://${__dirname}/index.html` + "/selectcontact");
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
