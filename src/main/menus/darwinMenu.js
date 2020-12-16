const { shell } = require('electron');

const menuConfig = require('./menu.config');
const i18nConfig = require('../i18next/i18n.config');

module.exports = (app, mainWindow, i18n) => {
  const menu = [
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
      label: i18n.t('Edit'),
      submenu: [
        {
          label: i18n.t('Edit copy'),
          role: 'copy',
        },
        {
          label: i18n.t('Edit cut'),
          role: 'cut',
        },
        {
          label: i18n.t('Edit paste'),
          role: 'paste',
        },
        {
          type: 'separator'
        },
        {
          label: i18n.t('Edit redo'),
          role: 'redo',
        },
        {
          label: i18n.t('Edit undo'),
          role: 'undo',
        }
      ],
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
          click() {
            shell.openExternal(menuConfig.links.learnMore);
          }
        },
        {
          type: 'separator'
        },
        {
          label: i18n.t('Report Issue'),
          click(item, focusedWindow) {
            shell.openExternal(menuConfig.links.reportIssue);
          }
        },
        {
          label: i18n.t('Github Repository'),
          click(item, focusedWindow) {
            shell.openExternal(menuConfig.links.github);
          }
        },
        {
          type: 'separator'
        },
        {
          label: i18n.t('WorkPlus Open'),
          click(item, focusedWindow) {
            shell.openExternal(menuConfig.links.workplusOpen);
          }
        },
        {
          label: i18n.t('WorkPlusFE FED'),
          click(item, focusedWindow) {
            shell.openExternal(menuConfig.links.fed);
          }
        }
      ]
    },
  ];

  return menu;
};
