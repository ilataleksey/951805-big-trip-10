import AbstractComponent from './abstract-component.js';

const createEventTemplate = () => {
  return (
    `<li class="trip-events__item"></li>`
  );
};

export default class Event extends AbstractComponent {
  getTemplate() {
    return createEventTemplate();
  }
}
