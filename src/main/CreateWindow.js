import { app, BrowserWindow, ipcMain, screen, remote, globalShortcut } from 'electron'
const path = require('path');
export const createOtherWindow = (link, role) => {
   const { width, height } = screen.getPrimaryDisplay().workAreaSize;// 获取到屏幕的宽度和高度
   let otherWindow = new BrowserWindow({
        height,
        useContentSize: true,
        width,
        frame: true, // 无边框窗口
        movable: true, // 可拖动
        resizable: false, //
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true,
            devTools: true,
            preload: path.join(process.cwd(), './dist/electron/preload.js')
        },
    });
    const currentUserAgent = otherWindow.webContents.userAgent;
    otherWindow.webContents.setUserAgent(`${currentUserAgent} workplus workplus-devtools`);

    otherWindow.loadURL(link);
    otherWindow.webContents.once('dom-ready', () => {
        otherWindow.webContents.openDevTools({ mode: 'right' });
    });

    const key = `role${otherWindow.id}`;
    global.shareRole[key] = role;
    otherWindow.on('closed', () => {
         otherWindow = null;
    });
}
