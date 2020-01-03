import {MONTHS} from '../const.js';

export const createInfoTemplate = (cards) => {

  const firstCity = cards[0].city;
  const lastCity = cards[cards.length - 1].city;

  const start = `${MONTHS[cards[0].dates.start.getMonth()].toUpperCase()} ${cards[0].dates.start.getDate()}`;
  let end = start;
  if (cards[0].dates.start.getMonth() === cards[cards.length - 1].dates.end.getMonth()) {
    end = `${cards[cards.length - 1].dates.end.getDate()}`;
  } else {
    end = `${MONTHS[cards[cards.length - 1].dates.start.getMonth()].toUpperCase()} ${cards[cards.length - 1].dates.start.getDate()}`;
  }

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${firstCity} &mdash; ... &mdash; ${lastCity}</h1>

      <p class="trip-info__dates">${start}&nbsp;&mdash;&nbsp;${end}</p>
    </div>`
  );
};
