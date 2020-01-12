import AbstractComponent from './abstract-component.js';

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

export default class Menu extends AbstractComponent {
  constructor(tabs) {
    super();

    this._tabs = tabs;
  }

  getTemplate() {
    return createMenuTemplate(this._tabs);
  }
}
