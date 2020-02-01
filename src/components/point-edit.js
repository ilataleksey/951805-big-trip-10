import AbstractSmartComponent from './abstract-smart-component.js';
import {CITIES, OFFERS} from '../const.js';
import flatpickr from 'flatpickr';
import {toCapitaliseFirstLetter} from '../utils/common.js';

export const TYPE_GROUPS = {
  transfers: [
    `taxi`,
    `bus`,
    `train`,
    `ship`,
    `transport`,
    `drive`,
    `flight`,
  ],
  activities: [
    `check-in`,
    `sightseeing`,
    `restaurant`,
  ],
};

export const getCitiesMarkup = (cities) => {
  return cities
    .map((city) => {
      return (
        `<option value="${city}"></option>`
      );
    })
    .join(`\n`);
};

export const createTypeItemMarkup = (checkedType, typeGroup) => {
  return typeGroup
    .map((type) => {
      const viewType = toCapitaliseFirstLetter(type);
      return (
        `<div class="event__type-item">
          <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === checkedType ? `checked` : ``}>
          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${viewType}</label>
        </div>`
      );
    })
    .join(`\n`);
};

export const createOffersMarkup = (additionOffers) => {
  return additionOffers
    .map((offer) => {
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}" ${offer.chosen ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${offer.id}-1">
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

const createEditPointFormTemplate = (point) => {
  const {type, destination, price, isFavorite, offers, photos} = point;

  const addOffers = createOffersMarkup(Array.from(offers));
  const cities = getCitiesMarkup(CITIES);
  const typesTransfer = createTypeItemMarkup(type, TYPE_GROUPS.transfers);
  const typesActivity = createTypeItemMarkup(type, TYPE_GROUPS.activities);

  const eventPhoto = createPhotoMarkup(photos);

  return (
    `<div>
      <form class="event trip-events__item event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${typesTransfer}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${typesActivity}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${toCapitaliseFirstLetter(type)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.city}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${cities}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
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
            <p class="event__destination-description">${destination.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${eventPhoto}
              </div>
            </div>
          </section>
        </section>
      </form>
    </div>`
  );
};

const parseFormData = (formData) => {
  const offers = OFFERS.map((offer) => {
    return {
      id: offer.id,
      type: offer.type,
      price: offer.price,
      chosen: formData.get(`event-offer-${offer.id}`)
    };
  });

  const end = new Date(formData.get(`event-end-time`));
  const start = new Date(formData.get(`event-start-time`));
  const duration = end - start;

  return {
    type: formData.get(`event-type`),
    destination: {
      city: formData.get(`event-destination`),
      description: formData.get(`event-destination`),
    },
    dates: {
      start,
      end,
      duration,
    },
    price: formData.get(`event-price`),
    isFavorite: formData.get(`event-favorite`),
    offers,
    photos: [],
  };
};

export default class EditPoint extends AbstractSmartComponent {
  constructor(point) {
    super();

    this._point = point;
    this._type = point.type;
    this._destination = point.destination;
    this._dates = point.dates;
    this._price = point.price;
    this._offers = point.offers;

    this._submitHandler = null;
    this._favoritButtonHandler = null;
    this._flatpickrStart = null;
    this._flatpickrEnd = null;
    this._deleteButtonClickHandler = null;

    this._subscribeOnEvents();
    this._applyFlatpickrStart();
    this._applyFlatpickrEnd();
  }

  getTemplate() {
    return createEditPointFormTemplate(this._point);
  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    super.removeElement();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setFavoritButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, handler);

    this._favoritButtonHandler = handler;
  }

  setTypeInputChangeHandler(handler) {
    this.getElement().querySelector(`.event__type-toggle`)
      .addEventListener(`change`, handler);

    this._typeInputHandler = handler;
  }

  setDestinationInputChangeHandler(handler) {
    this.getElement().querySelector(`.event__input--destination`)
      .addEventListener(`change`, handler);

    this._destinationInputHandler = handler;
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setFavoritButtonClickHandler(this._favoritButtonHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);

    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickrStart();
    this._applyFlatpickrEnd();
  }

  reset() {
    const point = this._point;

    this._type = point.type;
    this._destination = point.destination;
    this._dates = point.dates;
    this._price = point.price;
    this._offers = point.offers;

    this.rerender();
  }

  getData() {
    const form = this.getElement().querySelector(`.event--edit`);
    const formData = new FormData(form);

    return parseFormData(formData);
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`)
      .addEventListener(`click`, (evt) => {
        const typeInputElement = evt.target.parentElement.querySelector(`input`);
        this._point.type = typeInputElement.value;
        this.rerender();
      });

    element.querySelector(`.event__input--destination`)
      .addEventListener(`focusout`, (evt) => {
        this._point.destination.city = evt.target.value;
        this._point.destination.description = evt.target.value;

        this.rerender();
      });
  }

  _applyFlatpickrStart() {
    if (this._flatpickrStart) {
      // При своем создании `flatpickr` дополнительно создает вспомогательные DOM-элементы.
      // Что бы их удалять, нужно вызывать метод `destroy` у созданного инстанса `flatpickr`.
      this._flatpickrStart.destroy();
      this._flatpickrStart = null;
    }

    const dateStartElement = this.getElement().querySelector(`input[name=event-start-time]`);
    this._flatpickrStart = flatpickr(dateStartElement, {
      altInput: true,
      allowInput: true,
      enableTime: true,
      defaultDate: this._point.dates.start,
      altFormat: `d/m/y H:i`,
    });
  }

  _applyFlatpickrEnd() {
    if (this._flatpickrEnd) {
      // При своем создании `flatpickr` дополнительно создает вспомогательные DOM-элементы.
      // Что бы их удалять, нужно вызывать метод `destroy` у созданного инстанса `flatpickr`.
      this._flatpickrEnd.destroy();
      this._flatpickrEnd = null;
    }

    const dateEndElement = this.getElement().querySelector(`input[name=event-end-time]`);
    this._flatpickrEnd = flatpickr(dateEndElement, {
      altInput: true,
      allowInput: true,
      enableTime: true,
      defaultDate: this._point.dates.end,
      altFormat: `d/m/y H:i`,
    });
  }
}
