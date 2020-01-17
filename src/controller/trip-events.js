import DayComponent from '../components/day.js';
import DayListComponent from '../components/day-list.js';
import EventListComponent from '../components/event-list.js';
import EventComponent from '../components/event.js';
import EditCardComponent from '../components/edit-card.js';
import CardComponent from '../components/card.js';
import {render, replace, RenderPosition} from '../utils/render.js';
import NoCardComponent from '../components/no-card.js';
import InfoComponent from '../components/info.js';
import SortComponent, {SortType} from '../components/sort.js';

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

  const replaceCardToEdit = () => {
    replace(editCardComponent, cardComponent);
  };

  const replaceEditToCard = () => {
    replace(cardComponent, editCardComponent);
  };

  const cardComponent = new CardComponent(card);

  cardComponent.setEditButtonClickHandler(() => {
    replaceCardToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editCardComponent = new EditCardComponent(card, i);

  editCardComponent.setSubmitHandler(replaceEditToCard);

  render(eventListElement, cardComponent, RenderPosition.BEFOREEND);
};

export default class TripEventsController {
  constructor(container) {
    this._container = container;

    this._noCardComponent = new NoCardComponent();
    this._infoComponent = new InfoComponent();
    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();
    this._dayComponent = new DayComponent();
    this._eventListComponent = new EventListComponent();
    this._eventComponent = new EventComponent();
  }

  render(cards) {

    // добавляет в разметку дни и точки маршрута в соответствии с карточками
    const renderCards = (cardss) => {
      let dayCount = 0;
      cardss.forEach((card, i, array) => {
        const date = card.dates.start;

        // проверяем дату текущей карточки на совпадение предыдущей
        if (i === 0 || date.getDate() !== array[i - 1].dates.start.getDate()) {
          // создаем новый день
          dayCount = dayCount + 1;
          const dayComponent = new DayComponent(dayCount, date);
          render(dayListElement, dayComponent, RenderPosition.BEFOREEND);

          // создаем новый список событий
          const dayElement = dayComponent.getElement();
          this._eventListComponent = new EventListComponent();
          render(dayElement, this._eventListComponent, RenderPosition.BEFOREEND);
        }

        // рендерим карточку точки маршрута
        const eventListElement = this._eventListComponent.getElement();
        renderCard(eventListElement, card, i);
      });
    };

    // проверяем наличие карточек
    const container = this._container;
    render(container, this._dayListComponent, RenderPosition.BEFOREEND);

    const dayListElement = this._dayListComponent.getElement();
    const isNoCards = cards.length === 0;
    if (isNoCards) {
      // при отсутствии карточек маршрута выводится заглушка
      render(dayListElement, this._noCardComponent, RenderPosition.BEFOREEND);
      return;
    } else {
      // создает разметку с информацией о поездке
      const tripInfoElement = document.querySelector(`.trip-info`);
      const infoComponent = new InfoComponent(cards);
      render(tripInfoElement, infoComponent, RenderPosition.AFTERBEGINING);

      renderCards(cards);

      render(container, this._sortComponent, RenderPosition.AFTERBEGINING);
      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        let sortedCards = [];

        switch (sortType) {
          case SortType.EVENT:
            sortedCards = cards;
            break;
          case SortType.PRICE:
            sortedCards = cards.slice().sort((a, b) => b.price - a.price);
            break;
          case SortType.DURATION:
            sortedCards = cards.slice().sort((a, b) => b.dates.duration - a.dates.duration);
            break;
        }

        dayListElement.innerHTML = ``;

        renderCards(sortedCards);
      });
    }
  }
}

