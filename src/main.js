import InfoComponent from './components/info.js';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import SortElement from './components/sort.js';
import NewCardComponent from './components/new-card.js';
import {NEW_CARDS} from './const.js';
import DayListComponent from './components/day-list.js';
import NoCardComponent from './components/no-card.js';
import DayComponent from './components/day.js';
import EventListComponent from './components/event-list.js';
import EventComponent from './components/event.js';
import EditCardComponent from './components/edit-card.js';
import CardComponent from './components/card.js';
import {render, RenderPosition} from './utils.js';
import {generateCards} from './mock/card.js';
import {tabs} from './mock/menu.js';
import {filterElements} from './mock/filter.js';

const CARD_COUNT = 4;

// генерирует карточки точек маршрута
const cards = generateCards(CARD_COUNT);

// функция для генерации карточки точки маршрута внутри дня
const renderCard = (eventListElement, card, i) => {

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      evt.preventDefault();
      replaceEditToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const eventComponent = new EventComponent();
  const replaceCardToEdit = () => {

    eventListElement.replaceChild(eventComponent.getElement(), cardComponent.getElement());

    render(eventComponent.getElement(), editCardComponent.getElement(), RenderPosition.BEFOREEND);

    const editForm = eventComponent.getElement().querySelector(`form`);
    editForm.addEventListener(`submit`, replaceEditToCard);
  };

  const replaceEditToCard = () => {
    eventListElement.replaceChild(cardComponent.getElement(), eventComponent.getElement());
  };

  const cardComponent = new CardComponent(card);
  const editButton = cardComponent.getElement().querySelector(`.event__rollup-btn`);

  editButton.addEventListener(`click`, () => {
    replaceCardToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editCardComponent = new EditCardComponent(card, i);

  render(eventListElement, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

// функция для создания разметки дня
const renderDay = (card, i, array, dayCount) => {
  const date = card.dates.start;

  if (i === 0 || card.dates.start.getDate() !== array[i - 1].dates.start.getDate()) {

    dayCount++;
    const dayComponent = new DayComponent(dayCount, date);

    render(dayListComponent.getElement(), dayComponent.getElement(), RenderPosition.BEFOREEND);

    render(dayComponent.getElement(), new EventListComponent().getElement(), RenderPosition.BEFOREEND);

    const eventListElement = dayComponent.getElement().querySelector(`.trip-events__list`);

    renderCard(eventListElement, card, array, i);
  } else {
    const eventListElements = document.querySelectorAll(`.trip-events__list`);
    const lastEventListElementIndex = eventListElements.length - 1;
    const lastEventListElement = eventListElements[lastEventListElementIndex];

    renderCard(lastEventListElement, card, array, i);
  }

  return dayCount;
};

const siteHeaderElement = document.querySelector(`.page-header`);

// создаем разметку для меню и фильтра
const tripControlElement = siteHeaderElement.querySelector(`.trip-controls`);
render(tripControlElement, new MenuComponent(tabs).getElement(), RenderPosition.BEFOREEND);
render(tripControlElement, new FilterComponent(filterElements).getElement(), RenderPosition.BEFOREEND);

// создаем разметку для сортировки
const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);

// создаем разметку для заведения новой карточки точки маршрута
NEW_CARDS.forEach((card, i) => render(tripEventsElement, new NewCardComponent(card, i).getElement(), RenderPosition.BEFOREEND));

// создаем разметку списка сущесвующих точек маршрута
const dayListComponent = new DayListComponent();
render(tripEventsElement, dayListComponent.getElement(), RenderPosition.BEFOREEND);

// проверяем существуют ли точки маршрута
const isNoCards = cards.length === 0;
if (isNoCards) {

  // при отсутствии точек маршрута выводится заглушка
  render(dayListComponent.getElement(), new NoCardComponent().getElement(), RenderPosition.BEFOREEND);

} else {

  // создает разметку с информацией о поездке
  const tripInfoElement = siteHeaderElement.querySelector(`.trip-info`);
  render(tripInfoElement, new InfoComponent(cards).getElement(), RenderPosition.AFTERBEGINING);
  render(tripEventsElement, new SortElement().getElement(), RenderPosition.AFTERBEGINING);

  // добавляет в разметку дни и точки маршрута в соответствии с карточками
  let dayCount = 0;
  cards.forEach((card, i, array) => {
    dayCount = renderDay(card, i, array, dayCount);
  });
}
