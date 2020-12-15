const { shell } = require('electron');

const menuConfig = require('./menu.config');
const i18nConfig = require('../i18n.config');

module.exports = (app, mainWindow, i18n) => {
  let menu = [
    {
      label: i18n.t('WorkPlusFE DevTools'),
      submenu: [
        {
          label: i18n.t('About WorkPlusFE DevTools'),
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: i18n.t('Hide App'),
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: i18n.t('Hide Others'),
          accelerator: 'Command+Shift+H',
          role: 'hideothers'
        },
        {
          label: i18n.t('Show All'),
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: i18n.t('Quit'),
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: i18n.t('View'),
      submenu: [
        {
          label: i18n.t('Reload'),
          accelerator: 'Command+R',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          }
        },
        {
          label: i18n.t('Minimize'),
          accelerator: 'Command+M',
          role: 'minimize'
        }
      ]
    },
    {
      label: i18n.t('Help'),
      role: 'help',
      submenu: [
        {
          label: i18n.t('Learn More'),
          role: 'recentDocuments',
          click: function () {
            shell.openExternal(menuConfig.links.learnMore);
          }
        },
        {
          type: 'separator'
        },
        {
          label: i18n.t('Report Issue'),
          click: function (item, focusedWindow) {
            shell.openExternal(menuConfig.links.reportIssue);
          }
        },
        {
          label: i18n.t('Github Repository'),
          click: function (item, focusedWindow) {
            shell.openExternal(menuConfig.links.github);
          }
        },
        {
          type: 'separator'
        },
        {
          label: i18n.t('WorkPlus Open'),
          click: function (item, focusedWindow) {
            shell.openExternal(menuConfig.links.workplusOpen);
          }
        },
        {
          label: i18n.t('WorkPlusFE FED'),
          click: function (item, focusedWindow) {
            shell.openExternal(menuConfig.links.fed);
          }
        }
      ]
    },
  ];

  return menu;
};