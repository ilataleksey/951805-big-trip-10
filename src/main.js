import {createMenuTemplate} from './components/menu.js';
import {createFilterFormTemplate} from './components/filter.js';
import {createSortFormTemplate} from './components/sort.js';
import {createCardTemplate} from './components/card.js';
import {createNewCardFormTemplate} from './components/new-card.js';
import {createEditCardFormTemplate} from './components/edit-card.js';
import {createInfoTemplate} from './components/info.js';
import {createDayListTemplate} from './components/day-list.js';
import {createDayTemplate} from './components/day.js';
import {createEventListTemplate} from './components/event-list.js';
import {createEventTemplate} from './components/event.js';
import {generateCards} from './mock/card.js';
import {tabs} from './mock/menu.js';
import {filterElements} from './mock/filter.js';

const CARD_COUNT = 4;

// генерирует карточки точек маршрута
const cards = generateCards(CARD_COUNT);

// функция для рендеринга элементов разметки
const render = (container, template, place = `beforeend`) => (
  container.insertAdjacentHTML(place, template)
);

// создает разметку с информацией о поездке
const siteHeaderElement = document.querySelector(`.page-header`);
const tripInfoElement = siteHeaderElement.querySelector(`.trip-info`);
render(tripInfoElement, createInfoTemplate(cards), `afterbegin`);

// рассчитываем и изменяем стоимость поездки
const tripCostElement = document.querySelector(`.trip-info__cost-value`);
let tripCost = 0;
cards.forEach((card) => {
  tripCost += card.price;
});
tripCostElement.textContent = `${tripCost}`;

// создаем разметку для меню и фильтра
const tripControlElement = siteHeaderElement.querySelector(`.trip-controls`);
render(tripControlElement, createMenuTemplate(tabs));
render(tripControlElement, createFilterFormTemplate(filterElements));

// создаем разметку для сортировки
const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
render(tripEventsElement, createSortFormTemplate(), `afterbegin`);

// создаем разметку для заведения новой карточки точки маршрута
render(tripEventsElement, createNewCardFormTemplate());

// создаем разметку для добавления списка сущесвующих карточек
render(tripEventsElement, createDayListTemplate());

const dayListElement = tripEventsElement.querySelector(`.trip-days`);

// функция для добавления нового дня
const addDayList = (card) => {
  dayCount++;
  render(dayListElement, createDayTemplate(dayCount, card.dates.start));
};

// функция для генерации карточки точки маршрута внутри дня
const addEvent = (card, i) => {
  const dayElements = dayListElement.querySelectorAll(`.trip-days__item`);
  const dayElement = dayElements[dayElements.length - 1];
  render(dayElement, createEventListTemplate());

  const eventListElement = dayElement.querySelector(`.trip-events__list`);
  render(eventListElement, createEventTemplate());

  const eventElement = eventListElement.querySelector(`.trip-events__item`);
  if (i === 0) {
    render(eventElement, createEditCardFormTemplate(card));
  } else {
    render(eventElement, createCardTemplate(card));
  }
};

// добавляет в разметку дни и точки маршрута в соответствии с карточками
let dayCount = 0;
cards.forEach((card, i, array) => {
  if (i === 0) {
    addDayList(card);
    addEvent(card, i);
  } else {
    if (card.dates.start.getDate() !== array[i - 1].dates.start.getDate()) {
      addDayList(card);
      addEvent(card, i);
    } else {
      addEvent(card, i);
    }
  }
});
