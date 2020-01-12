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
export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGINING:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
