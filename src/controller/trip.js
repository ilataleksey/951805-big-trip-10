import DayComponent from '../components/day.js';
import EventListComponent from '../components/event-list.js';
import EventComponent from '../components/event.js';
import {render, RenderPosition} from '../utils/render.js';
import NoPointComponent from '../components/no-card.js';
import SortComponent, {SortType} from '../components/sort.js';
import {isOneDay} from '../utils/common.js';
import PointController from './point.js';

// функция отрисовки для
const renderDay = (container, dayNumber, date) => {
  const dayComponent = new DayComponent(dayNumber, date);
  render(container, dayComponent, RenderPosition.BEFOREEND);

  const dayElement = dayComponent.getElement();
  const eventListComponent = new EventListComponent();
  render(dayElement, eventListComponent, RenderPosition.BEFOREEND);

  return eventListComponent.getElement();
};

// добавляет в разметку дни и точки маршрута в соответствии с карточками
const renderPoints = (container, points, isDayCount, onDataChange, onViewChange) => {
  const newPoints = [];
  let dayNumber = 0;
  let date = ``;

  // по-умолчанию рендерится день
  // в него дня рендерится список событий
  let eventListElement = renderDay(container, dayNumber, date);

  if (isDayCount) {
    // зачищаем разметку
    container.innerHTML = ``;
  }

  points.forEach((point, i, array) => {
    // проверяем включен ли счет дней
    if (isDayCount) {
      // проверяем дату текущей карточки на совпадение предыдущей
      date = point.dates.start;
      if (i === 0 || !isOneDay(date, array[i - 1].dates.start)) {
        // создаем новый день
        dayNumber++;
        eventListElement = renderDay(container, dayNumber, date);
      }
    }

    // рендерим карточку точки маршрута в список событий
    const pointController = new PointController(eventListElement, onDataChange, onViewChange);
    pointController.render(point, i);
    newPoints.concat(pointController);
  });

  return newPoints;
};

export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._renderedPoints = [];
    this._isDayCount = true;

    this._noPointComponent = new NoPointComponent();
    this._sortComponent = new SortComponent();
    this._dayComponent = new DayComponent();
    this._eventComponent = new EventComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const points = this._pointsModel.getPoints();
    const container = this._container.getElement();

    // проверяем наличие карточек
    const isNoPoints = points.length === 0;
    if (isNoPoints) {
      // при отсутствии карточек маршрута выводится заглушка
      render(container, this._noPointComponent, RenderPosition.BEFOREEND);
    } else {
      render(container, this._sortComponent, RenderPosition.AFTERBEGINING);

      this._renderPoints(points);
    }
  }

  _removePoints() {
    this._renderPoints.forEach((point) => point.destroy());
    this._renderPoints = [];
  }

  _renderPoints(points) {
    const container = this._container.getElement();

    const newPoints = renderPoints(container, points, this._isDayCount, this._onDataChange, this._onViewChange);
    this._renderedPoints = this._renderedPoints.concat(newPoints);
  }

  _onSortTypeChange(sortType) {
    let sortedPoints = [];
    const points = this._PointsModel.getPoints();

    switch (sortType) {
      case SortType.EVENT:
        sortedPoints = points;
        this._isDayCount = true;
        break;
      case SortType.PRICE:
        sortedPoints = points.slice().sort((a, b) => b.price - a.price);
        this._isDayCount = false;
        break;
      case SortType.DURATION:
        sortedPoints = points.slice().sort((a, b) => b.dates.duration - a.dates.duration);
        this._isDayCount = false;
        break;
    }

    this._removePoints();
    this._renderPoints(sortedPoints);
  }

  _onDataChange(pointController, oldData, newData) {
    const points = this._pointsModel.getPoints();
    const pointIndex = points.findIndex((it) => it === oldData);

    if (pointIndex === -1) {
      return;
    }

    points = [].concat(points.slice(0, pointIndex), newData, points.slice(pointIndex + 1));

    pointController.render(points[pointIndex], pointIndex);
  }

  _onViewChange() {
    this._renderedPoints.forEach((point) => point.setDefaultView());
  }

  _onFilterChange() {
    this._removePoints();
    this._renderPoints(this._pointsModel.getTasks());
  }
}

