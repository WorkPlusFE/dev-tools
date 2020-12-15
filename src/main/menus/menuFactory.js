const Menu = require('electron').Menu;
const { isMac } = require('../tools');
const darwinTemplate = require('./darwinMenu');
const menu = null;

function MenuFactoryService(menu) {
  this.menu = menu;
  this.buildMenu = buildMenu;
}

function buildMenu(app, mainWindow, i18n) {
  if (isMac()) {
    this.menu = Menu.buildFromTemplate(darwinTemplate(app, mainWindow, i18n));
    console.log(this.menu, i18n);
    Menu.setApplicationMenu(this.menu);
  }
}

module.exports = new MenuFactoryService(menu);
