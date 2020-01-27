import AbstractComponent from './abstract-component.js';
import {formatTime, formatDateHTML, duration} from '../utils/common.js';

const createOffersMarkup = (additionOffers) => {
  return additionOffers
    .filter((offer) => offer.chosen)
    .slice(0, 3)
    .map((offer) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${offer.type}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </li>`
      );
    })
    .join(`\n`);
};

export const createCardTemplate = (card) => {
  const {type, destination, dates, price, offers} = card;

  const startTime = formatTime(dates.start);
  const endTime = formatTime(dates.end);
  const startTimeHTML = `${formatDateHTML(dates.start)}T${formatTime(dates.start)}`;
  const endTimeHTML = `${formatDateHTML(dates.end)}T${formatTime(dates.end)}`;

  let durationD = duration(dates.duration, `days`);
  durationD = durationD ? `${durationD}D` : ``;
  let durationH = duration(dates.duration, `hours`);
  durationH = durationH ? `${durationH}H` : ``;
  let durationM = duration(dates.duration, `minutes`);
  durationM = durationM ? `${durationM}M` : ``;

  const addOffers = createOffersMarkup(Array.from(offers));
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.action}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type.description} ${destination.city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startTimeHTML}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endTimeHTML}">${endTime}</time>
          </p>
          <p class="event__duration">${durationD} ${durationH} ${durationM}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${addOffers}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Card extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {
    return createCardTemplate(this._card);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
