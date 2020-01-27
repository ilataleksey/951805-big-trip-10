import MenuComponent from './components/menu.js';
import FilterController from './controller/filter.js';
import TripController from './controller/trip.js';
import DayListComponent from './components/day-list.js';
import InfoComponent from './components/info.js';
import PointsModel from './models/points.js';
import {render, RenderPosition} from './utils/render.js';
import {generatePoints} from './mock/card.js';
import {tabs} from './mock/menu.js';

// import {NEW_CARDS} from './const.js';
// import NewCardComponent from './components/new-card.js';

const POINTS_COUNT = 4;

const siteHeaderElement = document.querySelector(`.page-header`);

// Быстрое решение для подписки на клик по кнопке.
// Это противоречит нашей архитектуре работы с DOM-элементами, но это временное решение.
// Совсем скоро мы создадим полноценный компонент для работы с меню.
siteHeaderElement.getElement().querySelector(`.trip-main__event-add-btn`)
  .addEventListener(`click`, () => {
    tripController.createPoint();
  });

// генерируем карточки точек маршрута
const points = generatePoints(POINTS_COUNT);
const pointsModel = new PointsModel();
pointsModel.setPoints(points);

// создаем разметку для меню и фильтра
const tripControlElement = siteHeaderElement.querySelector(`.trip-controls`);
render(tripControlElement, new MenuComponent(tabs), RenderPosition.BEFOREEND);

const filterController = new FilterController(tripControlElement, pointsModel);
filterController.render();

// создаем разметку списка сущесвующих точек маршрута
const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);

const dayListComponent = new DayListComponent();
render(tripEventsElement, dayListComponent, RenderPosition.BEFOREEND);

const tripController = new TripController(dayListComponent, pointsModel);

if (points.length !== 0) {
  // создает разметку с информацией о поездке
  const tripInfoElement = document.querySelector(`.trip-info`);
  const infoComponent = new InfoComponent(points);
  render(tripInfoElement, infoComponent, RenderPosition.AFTERBEGINING);
}

tripController.render();


// создаем разметку для заведения новой карточки точки маршрута
// NEW_CARDS.forEach((card, i) => render(tripEventsElement, new NewCardComponent(card, i).getElement(), RenderPosition.BEFOREEND));
