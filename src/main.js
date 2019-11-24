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


const CARD_COUNT = 3;

const render = (container, template, place = `beforeend`) => (
  container.insertAdjacentHTML(place, template)
);

const siteHeaderElement = document.querySelector(`.page-header`);
const tripInfoElement = siteHeaderElement.querySelector(`.trip-info`);

render(tripInfoElement, createInfoTemplate(), `afterbegin`);

const tripControlElement = siteHeaderElement.querySelector(`.trip-controls`);
render(tripControlElement, createMenuTemplate());
render(tripControlElement, createFilterFormTemplate());

const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
render(tripEventsElement, createSortFormTemplate(), `afterbegin`);

render(tripEventsElement, createNewCardFormTemplate());

render(tripEventsElement, createDayListTemplate());

const dayListElement = tripEventsElement.querySelector(`.trip-days`);
render(dayListElement, createDayTemplate());

const dayElement = dayListElement.querySelector(`.day`);
render(dayElement, createEventListTemplate());

const eventListElement = dayElement.querySelector(`.trip-events__list`);
render(eventListElement, createEventTemplate());

const eventElement = eventListElement.querySelector(`.trip-events__item`);
render(eventElement, createEditCardFormTemplate());
new Array(CARD_COUNT)
    .fill(``)
    .forEach(
        () => render(eventListElement, createCardTemplate())
    );
