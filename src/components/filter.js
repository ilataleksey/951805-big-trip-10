import {createElement} from '../utils.js';

const createFilterMarkup = (filterElements) => {
  return filterElements
    .map((filterElement) => {
      return (
        `<div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${filterElement.toggle ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-everything">${filterElement.title.toUpperCase()}</label>
    </div>`
      );
    })
    .join(`\n`);
};

const createFilterFormTemplate = (filterElements) => {

  const filterMarkup = createFilterMarkup(filterElements);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterFormTemplate(this._filters);
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
