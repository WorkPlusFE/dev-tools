import { remote, ipcRenderer, shell } from 'electron';

export class OpenApp {
  /** 打开方式 */
  static open(app) {
    const startModal = app.startMode;
    switch (startModal) {
      case '外部浏览器打开': {
        OpenApp.externalOpen(app);
        break;
      }
      case '新窗口打开': {
        break;
      }
      case 'H5模拟器': {
        break;
      }
      case 'Pc模拟器': {
        break;
      }
    }
  }

  /** 外部浏览器打开 */
  static externalOpen(app) {
    const appAddress = app.address;
    shell.openExternal(appAddress);
  }

  /** 不带调试工具的新窗口 */
  static newBrowserWindow(app) {

  }

  /** 手机调试模式 */
  static H5DevTool(app) {

  }

  /** pc调试模式 */
  static PcDevTool(app) {

  }
}
