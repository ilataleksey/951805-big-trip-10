import DayComponent from '../components/day.js';
import EventListComponent from '../components/event-list.js';
import EventComponent from '../components/event.js';
import {render, RenderPosition} from '../utils/render.js';
import NoCardComponent from '../components/no-card.js';
import SortComponent, {SortType} from '../components/sort.js';
import {formatTimeHTMLShort} from '../utils/common.js';
import PointController from './point.js';

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noCardComponent = new NoCardComponent();
    this._sortComponent = new SortComponent();
    this._dayComponent = new DayComponent();
    this._eventListComponent = new EventListComponent();
    this._eventComponent = new EventComponent();
  }

  render(cards) {
    const container = this._container.getElement();

    // проверяем наличие карточек
    const isNoCards = cards.length === 0;
    if (isNoCards) {
      // при отсутствии карточек маршрута выводится заглушка
      render(container, this._noCardComponent, RenderPosition.BEFOREEND);
    } else {

      // добавляет в разметку дни и точки маршрута в соответствии с карточками
      const renderCards = (cardsArray, isDayCount) => {
        let dayNumber = 0;
        let date = ``;

        // по-умолчанию рендерится день
        let dayComponent = new DayComponent(dayNumber, date);
        render(container, dayComponent, RenderPosition.BEFOREEND);

        // в блок дня рендерится список событий
        let dayElement = dayComponent.getElement();
        this._eventListComponent = new EventListComponent();
        render(dayElement, this._eventListComponent, RenderPosition.BEFOREEND);

        if (isDayCount) {
          // зачищаем разметку
          container.innerHTML = ``;
        }

        cardsArray.forEach((card, i, array) => {
          // проверяем включен ли тублер
          if (isDayCount) {
            // проверяем дату текущей карточки на совпадение предыдущей
            date = card.dates.start;
            if (i === 0 || formatTimeHTMLShort(date) !== formatTimeHTMLShort(array[i - 1].dates.start)) {
              // создаем новый день
              dayNumber++;
              dayComponent = new DayComponent(dayNumber, date);
              render(container, dayComponent, RenderPosition.BEFOREEND);

              // создаем новый список событий
              dayElement = dayComponent.getElement();
              this._eventListComponent = new EventListComponent();
              render(dayElement, this._eventListComponent, RenderPosition.BEFOREEND);
            }
          }

          // рендерим карточку точки маршрута в список событий
          const eventListElement = this._eventListComponent.getElement();

          const pointController = new PointController(eventListElement);
          pointController.render(card, i);
        });

        render(container, this._sortComponent, RenderPosition.AFTERBEGINING);
        this._sortComponent.setSortTypeChangeHandler((sortType) => {
          let sortedCards = [];

          switch (sortType) {
            case SortType.EVENT:
              sortedCards = cards;
              isDayCount = true;
              break;
            case SortType.PRICE:
              sortedCards = cards.slice().sort((a, b) => b.price - a.price);
              isDayCount = false;
              break;
            case SortType.DURATION:
              sortedCards = cards.slice().sort((a, b) => b.dates.duration - a.dates.duration);
              isDayCount = false;
              break;
          }

          container.innerHTML = ``;

          renderCards(sortedCards, isDayCount);
        });
      };

      renderCards(cards, true);
    }
  }
}

