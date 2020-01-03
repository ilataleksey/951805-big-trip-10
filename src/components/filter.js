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

export const createFilterFormTemplate = (filterElements) => {

  const filterMarkup = createFilterMarkup(filterElements);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
