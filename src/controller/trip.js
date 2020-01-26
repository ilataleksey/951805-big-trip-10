import DayComponent from '../components/day.js';
import EventListComponent from '../components/event-list.js';
import EventComponent from '../components/event.js';
import {render, RenderPosition} from '../utils/render.js';
import NoCardComponent from '../components/no-card.js';
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
};

// добавляет в разметку дни и точки маршрута в соответствии с карточками
const renderCards = (container, cards, isDayCount, onDataChange, onViewChange) => {
  const newCards = [];
  let dayNumber = 0;
  let date = ``;

  // по-умолчанию рендерится день
  // в него дня рендерится список событий
  renderDay(container, dayNumber, date);

  if (isDayCount) {
    // зачищаем разметку
    container.innerHTML = ``;
  }

  cards.forEach((card, i, array) => {
    // проверяем включен ли счет дней
    if (isDayCount) {
      // проверяем дату текущей карточки на совпадение предыдущей
      date = card.dates.start;
      if (i === 0 || !isOneDay(date, array[i - 1].dates.start)) {
        // создаем новый день
        dayNumber++;
        renderDay(container, dayNumber, date);
      }
    }

    // рендерим карточку точки маршрута в список событий
    const eventListElement = new EventListComponent().getElement();

    const pointController = new PointController(eventListElement, onDataChange, onViewChange);
    pointController.render(card, i);
    newCards.concat(pointController);
  });

  return newCards;
};

export default class TripController {
  constructor(container, cardsModel) {
    this._container = container;
    this._cardsModel = cardsModel;

    this._renderedCards = [];
    this._isDayCount = true;

    this._noCardComponent = new NoCardComponent();
    this._sortComponent = new SortComponent();
    this._dayComponent = new DayComponent();
    this._eventComponent = new EventComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render() {
    const cards = this._cardsModel.getCards();
    const container = this._container.getElement();

    // проверяем наличие карточек
    const isNoCards = cards.length === 0;
    if (isNoCards) {
      // при отсутствии карточек маршрута выводится заглушка
      render(container, this._noCardComponent, RenderPosition.BEFOREEND);
    } else {
      render(container, this._sortComponent, RenderPosition.AFTERBEGINING);

      this._renderCards(cards);
    }
  }

  _removeCards() {
    this._renderCards.forEach((card) => card.destroy());
    this._renderCards = [];
  }

  _renderCards(cards) {
    const container = this._container;

    const newCards = renderCards(container, cards, this._isDayCount, this._onDataChange, this._onViewChange);
    this._renderedCards = this._renderedCards.concat(newCards);
  }

  _onSortTypeChange(sortType) {
    let sortedCards = [];
    const cards = this._cardsModel.getCards();

    switch (sortType) {
      case SortType.EVENT:
        sortedCards = cards;
        this._isDayCount = true;
        break;
      case SortType.PRICE:
        sortedCards = cards.slice().sort((a, b) => b.price - a.price);
        this._isDayCount = false;
        break;
      case SortType.DURATION:
        sortedCards = cards.slice().sort((a, b) => b.dates.duration - a.dates.duration);
        this._isDayCount = false;
        break;
    }

    this._removeCards();
    this._renderCards(sortedCards);
  }

  _onDataChange(pointController, oldData, newData) {
    const cardIndex = this._cards.findIndex((it) => it === oldData);

    if (cardIndex === -1) {
      return;
    }

    this._cards = [].concat(this._cards.slice(0, cardIndex), newData, this._cards.slice(cardIndex + 1));

    pointController.render(this._cards[cardIndex], cardIndex);
  }

  _onViewChange() {
    this._renderedCards.forEach((card) => card.setDefaultView());
  }
}

