module.exports = (app, mainWindow, i18n) => {
  const menu = [
    {
      label: i18n.t('&File'),
      submenu: [
        {
          label: i18n.t('&Quit'),
          accelerator: 'Ctrl+Q',
          click: function () {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: i18n.t('Reload'),
          accelerator: 'Command+R',
          click: function (item, focusedWindow) {
            focusedWindow.reload();
          }
        },
        {
          label: i18n.t('Full Screen'),
          accelerator: 'Ctrl+Command+F',
          click: function (item, focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
        {
          label: i18n.t('Minimize'),
          accelerator: 'Command+M',
          role: 'minimize'
        },
        {
          type: 'separator'
        },
        {
          label: i18n.t('Toggle Developer Tools'),
          accelerator: 'Alt+Command+I',
          click: function (item, focusedWindow) {
            focusedWindow.webContents.toggleDevTools();
          }
        }
      ]
    },
    {
      label: i18n.t('Help'),
      submenu: [
        {
          label: i18n.t('About App'),
          click: function (item, focusedWindow) {
            if (focusedWindow) {
            }
          }
        }
      ]
    }
  ];

  return menu;
};