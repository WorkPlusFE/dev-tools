import VueInstance from '../main';

export const isValidateUrl = (url) => {
  const regexp = /^https?:\/\/([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+/;
  return regexp.test(url);
};

export const hasSpecialCharacters = (value) => {
  const regexp = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
  return !regexp.test(value);
};

export const hasSpace = (value) => /\s+/.test(value);

export const nameValidater = (type) => (_, name, callback) => {
  if (hasSpace(name)) {
    callback(new Error(`${type} ${VueInstance.$t('util.noEmpty')}`));
  } else {
    callback();
  }
};

export const urlValidater = (message) => (_, link, callback) => {
  if (!isValidateUrl(link)) {
    callback(new Error(`${message}`));
  } else {
    callback();
  }
};
