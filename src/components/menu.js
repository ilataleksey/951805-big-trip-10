const createMenuMarkup = (menuElements) => {
  return menuElements
    .map((menuElement) => {
      return (
        `<a class="trip-tabs__btn  trip-tabs__btn${menuElement.toggle ? `--active` : ``}" href="#">${menuElement.title}</a>`
      );
    })
    .join(`\n`);
};

export const createMenuTemplate = (menuElements) => {

  const menuMarkup = createMenuMarkup(menuElements);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${menuMarkup}
    </nav>`
  );
};
