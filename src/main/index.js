import { app, BrowserWindow, ipcMain } from 'electron' // eslint-disable-line

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 500,
    useContentSize: true,
    width: 800,
    frame: false, // 无边框窗口
    movable: true, // 可拖动
  });

  mainWindow.loadURL(winURL);
  mainWindow.webContents.once('dom-ready', () => {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  });


  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
function listen() {
  ipcMain.on(`resize-window`, (eveny, x, y) => {
    mainWindow.setSize(x, y);
  });
  ipcMain.on('CLOSEAPP', () => {
    console.log('closeapp');
    mainWindow.close()
  })
  ipcMain.on('CENTER', () => {
    mainWindow.center()
  });
}

app.on('ready', () => {
  createWindow();
  listen();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
