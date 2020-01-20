import {render, replace, RenderPosition} from '../utils/render.js';
import CardComponent from '../components/card.js';
import EditCardComponent from '../components/edit-card.js';

export default class PointController {
  constructor(container) {
    this._container = container;

    this._cardComponent = null;
    this._editCardComponent = null;
  }

  // функция для генерации карточки точки маршрута внутри дня
  render(card, i) {
    this._cardComponent = new CardComponent(card);
    this._editCardComponent = new EditCardComponent(card, i);

    this._cardComponent.setEditButtonClickHandler(() => {
      this._replaceCardToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editCardComponent.setSubmitHandler(this._replaceEditToCard);

    render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
  }

  _replaceCardToEdit() {
    replace(this._editCardComponent, this._cardComponent);
  }

  _replaceEditToCard() {
    replace(this._cardComponent, this._editCardComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      evt.preventDefault();
      this._replaceEditToCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
