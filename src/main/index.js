import { app, BrowserWindow, ipcMain } from 'electron' // eslint-disable-line
import { pathToFileURL } from 'url';
import { EventEmitter } from 'events';
const path = require('path');
const i18n = require('./i18next/i18n');
const menuFactoryService = require('./menus/menuFactory');
const { createOtherWindow } = require('./CreateWindow');
const { ContactWindow, contactWinShow, contactWinHide } = require('./ContactWindow')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}
export const bus = new EventEmitter();
global.shareRole = {

}

let mainWindow,
contactWindow,
  appWin;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://172.16.1.66:9080'
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
    resizable: true, //
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true
    },
  });

  mainWindow.loadURL(winURL);
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.on("did-frame-finish-load", () => {
      mainWindow.webContents.once("devtools-opened", () => {
        mainWindow.focus();
      });
      mainWindow.webContents.openDevTools();
    });
  }
  mainWindow.webContents.once('dom-ready', () => {
    if (process.env.NODE_ENV !== 'production') {
      // mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  global.shareRole.mainwin = mainWindow;
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
  ipcMain.on('OPEN', (event, url, role) => {
    console.log(url);
    createOtherWindow(url, role)
  })
  ipcMain.on('show-contact-win', (event, args) => {
    contactWinShow(contactWindow);
  })
  ipcMain.on('close-contact-win', (event, args) => {
    contactWinHide(contactWindow);
  })
  ipcMain.on('show-center', () => {
    mainWindow.center();
    mainWindow.moveTop();
  })
}

app.on('ready', () => {
  createWindow();
  // contactWindow = ContactWindow();
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

