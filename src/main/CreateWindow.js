import { app, BrowserWindow, ipcMain,screen } from 'electron'

export const createOtherWindow = (link) => {
   const {width,height} = screen.getPrimaryDisplay().workAreaSize;//获取到屏幕的宽度和高度
   let  otherWindow = new BrowserWindow({
        height: height,
        useContentSize: true,
        width: width,
        // frame: false, // 无边框窗口
        movable: true, // 可拖动
        resizable: false, //
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true,
            devTools: true
        },
    });
    otherWindow.loadURL(link);
    otherWindow.webContents.once('dom-ready', () => {
        otherWindow.webContents.openDevTools({ mode: 'right' });
    });
    
    otherWindow.on('closed', () => {
         otherWindow = null;
    });
}
