import AbstractComponent from './abstract-component.js';
import {MONTHS} from '../const.js';
import {formatTimeHTMLShort} from '../utils/common.js';

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

export default class Day extends AbstractComponent {
  constructor(dayCount, date) {
    super();

    this._dayCount = dayCount;
    this._date = date;
  }

  getTemplate() {
    return createDayTemplate(this._dayCount, this._date);
  }
}
