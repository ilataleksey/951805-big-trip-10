import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import DayListController from './controller/trip-events.js';
import DayListComponent from './components/day-list.js';
import InfoComponent from './components/info.js';
import {render, RenderPosition} from './utils/render.js';
import {generateCards} from './mock/card.js';
import {tabs} from './mock/menu.js';
import {filterElements} from './mock/filter.js';

// import {NEW_CARDS} from './const.js';
// import NewCardComponent from './components/new-card.js';

const CARD_COUNT = 4;

const siteHeaderElement = document.querySelector(`.page-header`);

// создаем разметку для меню и фильтра
const tripControlElement = siteHeaderElement.querySelector(`.trip-controls`);
render(tripControlElement, new MenuComponent(tabs), RenderPosition.BEFOREEND);
render(tripControlElement, new FilterComponent(filterElements), RenderPosition.BEFOREEND);

// создаем разметку списка сущесвующих точек маршрута
const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);

const dayListComponent = new DayListComponent();
render(tripEventsElement, dayListComponent, RenderPosition.BEFOREEND);

const dayListController = new DayListController(dayListComponent);

// генерируем карточки точек маршрута
const cards = generateCards(CARD_COUNT);

// создает разметку с информацией о поездке
const tripInfoElement = document.querySelector(`.trip-info`);
const infoComponent = new InfoComponent(cards);
render(tripInfoElement, infoComponent, RenderPosition.AFTERBEGINING);

dayListController.render(cards);


// создаем разметку для заведения новой карточки точки маршрута
// NEW_CARDS.forEach((card, i) => render(tripEventsElement, new NewCardComponent(card, i).getElement(), RenderPosition.BEFOREEND));
