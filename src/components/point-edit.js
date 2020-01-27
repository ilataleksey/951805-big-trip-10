import AbstractSmartComponent from './abstract-smart-component.js';
import {formatTime, formatDate} from '../utils/common.js';
import {CITIES, TYPES} from '../const.js';
import flatpickr from 'flatpickr';

const getCitiesMarkup = (cities) => {
  return cities
    .map((city) => {
      return (
        `<option value="${city}"></option>`
      );
    })
    .join(`\n`);
};

const createTypeItemMarkup = (checkedType, isTransfer, i) => {
  return TYPES
    .map((type) => {
      if (isTransfer) {
        return (
          `<div class="event__type-item">
            <input id="event-type-${type.action.toLowCase()}-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.action.toLowCase()}">
            <label class="event__type-label  event__type-label--${type.action}" for="event-type-${type.action.toLowCase()}-${i}" ${checkedType === type.action.toLowCase() ? `checked` : ``}>${type.action}</label>
          </div>`
        );
      } else {
        return (
          `<div class="event__type-item">
            <input id="event-type-${type.action.toLowCase()}-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.action.toLowCase()}">
            <label class="event__type-label  event__type-label--${type.action}" for="event-type-${type.action.toLowCase()}-${i}" ${checkedType === type.action.toLowCase() ? `checked` : ``}>${type.action}</label>
          </div>`
        );
      }
    })
    .join(`\n`);
};

const createOffersMarkup = (additionOffers, i) => {
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

const createPhotoMarkup = (photos) => {
  return photos
    .map((photo) => {
      return (
        `<img class="event__photo" src="${photo}" alt="Event photo">`
      );
    })
    .join(`\n`);
};

const createEditCardFormTemplate = (card, i) => {
  const {type, destination, price, isFavorite, offers, photos} = card;

  const addOffers = createOffersMarkup(Array.from(offers), i);
  const cities = getCitiesMarkup(CITIES);
  const typesTransfer = createTypeItemMarkup(type, true, i);
  const typesActivity = createTypeItemMarkup(type, false, i);

  const eventPhoto = createPhotoMarkup(photos);

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
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
                ${typesTransfer}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${typesActivity}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${i}">
              ${type.description}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${i}" type="text" name="event-destination" value="${destination.city}" list="destination-list-${i}">
            <datalist id="destination-list-${i}">
              ${cities}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${i}">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-${i}" type="text" name="event-start-time" value="">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-${i}" type="text" name="event-end-time" value="">
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
            <p class="event__destination-description">${destination.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${eventPhoto}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};

const parseFormData = (formData) => {
  return {
    type: formData.get(`event-type`),
    destination: {
      city: formData.get(`event-destination`),
    },
    dates: {
      start: formData.get(`event-start-time`),
      end: formData.get(`event-end-time`),
    },
    price: formData.get(`event-price`),
    isFavorite: formData.get(`event-favorite`),
    offers: formData.getAll(`event-offer-*`),
  };
};

export default class EditCard extends AbstractSmartComponent {
  constructor(card, i) {
    super();

    this._card = card;
    this._index = i + 1;

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
    return createEditCardFormTemplate(this._card, this._index);
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
        this._card.type.action = typeInputElement.value;

        this._card.type.description = evt.target.innerHTML;
        this.rerender();
      });

    element.querySelector(`.event__input--destination`)
      .addEventListener(`focusout`, (evt) => {
        this._card.destination.city = evt.target.value;
        this._card.destination.description = evt.target.value;

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
      defaultDate: this._card.dates.start,
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
      defaultDate: this._card.dates.end,
      altFormat: `d/m/y H:i`,
    });
  }
}
