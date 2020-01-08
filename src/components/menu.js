import {createElement} from '../utils.js';

const createMenuMarkup = (tabs) => {
  return tabs
    .map((tab) => {
      return (
        `<a class="trip-tabs__btn  trip-tabs__btn${tab.toggle ? `--active` : ``}" href="#">${tab.title}</a>`
      );
    })
    .join(`\n`);
};

const createMenuTemplate = (tabs) => {

  const menuMarkup = createMenuMarkup(tabs);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${menuMarkup}
    </nav>`
  );
};

export default class Menu {
  constructor(tabs) {
    this._tabs = tabs;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._tabs);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
