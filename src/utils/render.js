export const RenderPosition = {
  AFTERBEGINING: `afterbegining`,
  BEFOREEND: `beforeend`,
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
