export const RenderPosition = {
  AFTERBEGINING: `afterbegining`,
  BEFOREEND: `beforeend`,
};

const getFormat = (date) => {
  return {
    day: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
    month: date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
    fullYear: date.getFullYear(),
    year: date.getFullYear()
      .toString()
      .slice(-2),
    hours: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
    minutes: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
  };
};

export const formatTime = (date) => {
  return `${getFormat(date).day}/${getFormat(date).month}/${getFormat(date).year} ${getFormat(date).hours}:${getFormat(date).minutes}`;
};

export const formatTimeShort = (date) => {
  return `${getFormat(date).hours}:${getFormat(date).minutes}`;
};

export const formatTimeHTML = (date) => {
  return `${getFormat(date).fullYear}-${getFormat(date).month}-${getFormat(date).day}T${getFormat(date).hours}:${getFormat(date).minutes}`;
};

export const formatTimeHTMLShort = (date) => {
  return `${getFormat(date).fullYear}-${getFormat(date).month}-${getFormat(date).day}`;
};

// функция создания контейнера для элемента
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// функция для рендеринга элементов разметки
export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGINING:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
