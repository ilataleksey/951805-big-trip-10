import AbstractComponent from './abstract-component.js';
import {formatTime} from '../utils/common.js';

export const createOffersMarkup = (additionOffers, i) => {
  return additionOffers
    .map((offer) => {
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-${i}" type="checkbox" name="event-offer-${offer.id}" ${offer.chosen ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${offer.id}-${i}">
            <span class="event__offer-title">${offer.type}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`
      );
    })
    .join(`\n`);
};

export const createPhotoMarkup = (photos) => {
  return photos
    .map((photo) => {
      return (
        `<img class="event__photo" src="${photo}" alt="Event photo">`
      );
    })
    .join(`\n`);
};

const createEditCardFormTemplate = (card, i) => {
  const {type, city, dates, price, isFavorite, offers, dest, photos} = card;

  const startTime = formatTime(dates.start);
  const endTime = formatTime(dates.end);
  const addOffers = createOffersMarkup(Array.from(offers), i);

  const eventPhoto = createPhotoMarkup(photos);

  return (
    `<form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${i}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.action}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${i}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${i}">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-${i}">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-${i}">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-${i}">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-${i}">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-${i}">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-${i}">Flight</label>
              </div>
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              <div class="event__type-item">
                <input id="event-type-check-in-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${i}">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${i}">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${i}">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${i}">
            ${type.description}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${i}" type="text" name="event-destination" value="${city}" list="destination-list-${i}">
          <datalist id="destination-list-${i}">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${i}">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-${i}" type="text" name="event-start-time" value="${startTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-${i}" type="text" name="event-end-time" value="${endTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${i}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${i}" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-${i}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-${i}">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">

        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${addOffers}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${dest}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${eventPhoto}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

export default class EditCard extends AbstractComponent {
  constructor(card, i) {
    super();

    this._card = card;
    this._index = i + 1;
  }

  getTemplate() {
    return createEditCardFormTemplate(this._card, this._index);
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);
  }
}
