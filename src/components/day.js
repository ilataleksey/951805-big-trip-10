import AbstractComponent from './abstract-component.js';
import {MONTHS} from '../const.js';
import {formatTimeHTMLShort} from '../utils/common.js';

const createDayTemplate = (dayNumber, date) => {

  let dayTemplate = ``;

  if (dayNumber !== 0) {
    const day = `${MONTHS[date.getMonth()].toUpperCase()} ${date.getDate()}`;
    const dayHTML = formatTimeHTMLShort(date);

    dayTemplate = (
      `<span class="day__counter">${dayNumber}</span>
      <time class="day__date" datetime="${dayHTML}">${day}</time>`
    );
  }

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        ${dayTemplate}
      </div>
    </li>`
  );
};

export default class Day extends AbstractComponent {
  constructor(dayNumber, date) {
    super();

    this.dayNumber = dayNumber;
    this._date = date;
  }

  getTemplate() {
    return createDayTemplate(this.dayNumber, this._date);
  }
}
