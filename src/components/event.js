import {createElement} from '../utils.js';

const createEventTemplate = () => {
  return (
    `<li class="trip-events__item"></li>`
  );
};

export default class Event {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventTemplate();
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
