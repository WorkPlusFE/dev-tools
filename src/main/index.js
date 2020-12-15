import { app, BrowserWindow, ipcMain } from 'electron' // eslint-disable-line

const i18n = require('./i18next/i18n');
const menuFactoryService = require('./menus/menuFactory');
const {createOtherWindow} = require('./CreateWindow');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow,
  appWin;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 620,
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

  mainWindow.loadURL(winURL);
  mainWindow.webContents.once('dom-ready', () => {
    if (process.env.NODE_ENV !== 'production') {
      // mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
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
  ipcMain.on('OPEM_APP_WIN', (event, url) => {
    console.log(url);
    // createOtherWindow(url)
  })
  ipcMain.on('OPEN',(event,url) => {
    console.log(url);
    createOtherWindow(url)
  })
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



// i18n
i18n.on('loaded', (loaded) => {
  i18n.changeLanguage('zh-CN');
  i18n.off('loaded');
});

i18n.on('languageChanged', (lng) => {
  menuFactoryService.buildMenu(app, mainWindow, i18n);
});

app.changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
};
