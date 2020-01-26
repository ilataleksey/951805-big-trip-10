import {MONTHS} from '../const.js';
import AbstractComponent from './abstract-component.js';

const createInfoTemplate = (cards) => {

  const citiesList = new Set();
  cards.forEach((card) => {
    citiesList.add(card.city);
  });

  const cities = Array.from(citiesList);
  const firstCity = cities[0];
  const secondCity = cities[1];
  const lastCity = cities[citiesList.size - 1];
  let rout = ``;

  switch (citiesList.size) {
    case 1:
      rout = `${firstCity}`;
      break;
    case 2:
      rout = `${firstCity} &mdash; ${lastCity}`;
      break;
    case 3:
      rout = `${firstCity} &mdash; ${secondCity} &mdash; ${lastCity}`;
      break;
    default:
      rout = `${firstCity} &mdash; ... &mdash; ${lastCity}`;
      break;
  }

  const start = `${MONTHS[cards[0].dates.start.getMonth()].toUpperCase()} ${cards[0].dates.start.getDate()}`;
  let end = start;
  if (cards[0].dates.start.getMonth() === cards[cards.length - 1].dates.end.getMonth()) {
    end = `${cards[cards.length - 1].dates.end.getDate()}`;
  } else {
    end = `${MONTHS[cards[cards.length - 1].dates.start.getMonth()].toUpperCase()} ${cards[cards.length - 1].dates.start.getDate()}`;
  }

  // рассчитываем и изменяем стоимость поездки
  const tripCostElement = document.querySelector(`.trip-info__cost-value`);

  const tripCost = cards.reduce((prev, acc) => prev + acc.price, 0);
  tripCostElement.textContent = `${tripCost}`;

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${rout}</h1>

      <p class="trip-info__dates">${start}&nbsp;&mdash;&nbsp;${end}</p>
    </div>`
  );
};

export default class Info extends AbstractComponent {
  constructor(cards) {
    super();

    this._cards = cards;
  }

  getTemplate() {
    return createInfoTemplate(this._cards);
  }
}
