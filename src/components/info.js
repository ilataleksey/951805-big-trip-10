import {MONTHS} from '../const.js';
import {createElement} from '../utils.js';

const createInfoTemplate = (cards) => {

  const firstCity = cards[0].city;
  const lastCity = cards[cards.length - 1].city;

  const start = `${MONTHS[cards[0].dates.start.getMonth()].toUpperCase()} ${cards[0].dates.start.getDate()}`;
  let end = start;
  if (cards[0].dates.start.getMonth() === cards[cards.length - 1].dates.end.getMonth()) {
    end = `${cards[cards.length - 1].dates.end.getDate()}`;
  } else {
    end = `${MONTHS[cards[cards.length - 1].dates.start.getMonth()].toUpperCase()} ${cards[cards.length - 1].dates.start.getDate()}`;
  }

  // рассчитываем и изменяем стоимость поездки
  const tripCostElement = document.querySelector(`.trip-info__cost-value`);
  let tripCost = 0;
  cards.forEach((card) => {
    tripCost += card.price;
  });
  tripCostElement.textContent = `${tripCost}`;

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${firstCity} &mdash; ... &mdash; ${lastCity}</h1>

      <p class="trip-info__dates">${start}&nbsp;&mdash;&nbsp;${end}</p>
    </div>`
  );
};

export default class Info {
  constructor(cards) {
    this._cards = cards;
    this._element = null;
  }

  getTemplate() {
    return createInfoTemplate(this._cards);
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
