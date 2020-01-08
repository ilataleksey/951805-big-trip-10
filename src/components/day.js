import {MONTHS} from '../const.js';
import {createElement, formatTimeHTMLShort} from '../utils.js';

const createDayTemplate = (dayCount, date) => {

  const day = `${MONTHS[date.getMonth()].toUpperCase()} ${date.getDate()}`;
  const dayHTML = formatTimeHTMLShort(date);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCount}</span>
        <time class="day__date" datetime="${dayHTML}">${day}</time>
      </div>
    </li>`
  );
};

export default class Day {
  constructor(dayCount, date) {
    this._date = date;
    this._dayCount = dayCount;
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._dayCount, this._date);
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
