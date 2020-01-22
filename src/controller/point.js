import {render, replace, RenderPosition} from '../utils/render.js';
import CardComponent from '../components/card.js';
import EditCardComponent from '../components/edit-card.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._cardComponent = null;
    this._editCardComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  // функция для генерации карточки точки маршрута внутри дня
  render(card, i) {
    const oldCardComponent = this._cardComponent;
    const oldEditCardComponent = this._editCardComponent;

    this._cardComponent = new CardComponent(card);
    this._editCardComponent = new EditCardComponent(card, i);

    this._cardComponent.setEditButtonClickHandler(() => {
      this._replaceCardToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editCardComponent.setFavoritButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isFavorite: !card.isFavorite,
      }));
    });

    this._editCardComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToCard();
    });

    if (oldEditCardComponent && oldCardComponent) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._editCardComponent, oldEditCardComponent);
    } else {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    }
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      evt.preventDefault();
      this._replaceEditToCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _replaceCardToEdit() {
    this._onViewChange();

    replace(this._editCardComponent, this._cardComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToCard() {
    this._editCardComponent.rerender();
    replace(this._cardComponent, this._editCardComponent);
    this._mode = Mode.DEFAULT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToCard();
    }
  }
}
