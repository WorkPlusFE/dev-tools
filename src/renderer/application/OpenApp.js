// import { remote, ipcRenderer, shell } from 'electron';
const { remote, ipcRenderer, shell } = window.require('electron');
export class OpenApp {
  /** 打开方式 */
  static open(app) {
    const startModal = app.startMode;
    switch (startModal) {
      case 'externalOpen': {
        OpenApp.externalOpen(app);
        break;
      }
      case 'H5DevTool': {
        OpenApp.H5DevTool(app);
        break;
      }
    }
  }

  /** 外部浏览器打开 */
  static externalOpen(app) {
    const appLink = app.link;
    shell.openExternal(appLink);
  }

  /** 手机调试模式 */
  static H5DevTool(app) {
    const url = app.link;
    console.log(ipcRenderer);
    ipcRenderer.send('OPEN',url);
  }
}
