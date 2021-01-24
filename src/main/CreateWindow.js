import { app, BrowserWindow, ipcMain, screen, remote, globalShortcut, BrowserView } from 'electron'
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
        // otherWindow.webContents.openDevTools({ mode: 'right' });
        otherWindow.webContents.closeDevTools();
    });

    const key = `role${otherWindow.id}`;
    global.shareRole[key] = role;
    otherWindow.on('closed', () => {
         otherWindow = null;
    });

    const viewURL = process.env.NODE_ENV === 'development' ? 'http://localhost:9080/#/navigation' : `file://${__dirname}/index.html/#/navigation`;

    const view = new BrowserView({
        show: true,
        transparent: true,
        movable: true, // 可拖动
        webPreferences: {
          nodeIntegration: true,
          nodeIntegrationInWorker: true,
          enableRemoteModule: true
        }
    })
    otherWindow.setBrowserView(view)
    view.setBounds({
 x: 0, y: 0, width: 300, height: 50
})
    view.webContents.closeDevTools();
    view.webContents.loadURL(viewURL)

    return otherWindow;
}
