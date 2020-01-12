import AbstractComponent from './abstract-component.js';
import {formatTimeShort, formatTimeHTML} from '../utils/common.js';
import {MILSEC_IN_DAY, MILSEC_IN_HOUR, MILSEC_IN_MIN} from '../const.js';

const createOffersMarkup = (additionOffers) => {
  return additionOffers
    .filter((offer) => offer.chosen)
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
  const {type, city, dates, price, offers} = card;

  const startTimeShort = formatTimeShort(dates.start);
  const endTimeShort = formatTimeShort(dates.end);
  const startTimeHTML = formatTimeHTML(dates.start);
  const endTimeHTML = formatTimeHTML(dates.end);

  const durationDays = Math.floor(dates.duration / MILSEC_IN_DAY);
  const durationHours = Math.floor((dates.duration % MILSEC_IN_DAY) / MILSEC_IN_HOUR);
  const durationMinutes = Math.floor(((dates.duration % MILSEC_IN_DAY) % MILSEC_IN_HOUR) / MILSEC_IN_MIN);

  let durationD = ``;
  if (durationDays) {
    durationD = durationDays >= 10 ? `${durationDays}D` : `0${durationDays}D`;
  }

  let durationH = ``;
  if (durationHours) {
    durationH = durationHours >= 10 ? `${durationHours}H` : `0${durationHours}H`;
  }

  let durationM = ``;
  if (durationMinutes) {
    durationM = durationMinutes >= 10 ? `${durationMinutes}M` : `0${durationMinutes}M`;
  }

  const addOffers = createOffersMarkup(Array.from(offers));
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.action}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type.description} ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startTimeHTML}">${startTimeShort}</time>
            &mdash;
            <time class="event__end-time" datetime="${endTimeHTML}">${endTimeShort}</time>
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
}
