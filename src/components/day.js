import {MONTHS} from '../const.js';
import {formatTimeHTMLShort} from '../utils.js';

export const createDayTemplate = (dayCount, date) => {

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
