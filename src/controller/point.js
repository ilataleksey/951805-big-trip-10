import {render, replace, remove, RenderPosition} from '../utils/render.js';
import PointComponent from '../components/point.js';
import PointEditComponent from '../components/point-edit.js';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyPoint = {
  id: `new-point`,
  type: `flight`,
  destination: {
    city: `Geneva`,
    description: `Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.`,
  },
  dates: {
    start: new Date(),
    end: new Date(),
    duration: 0,
  },
  price: ``,
  offers: [
    {
      id: `luggage`,
      type: `Add luggage`,
      price: 10,
      chosen: false,
    },
    {
      id: `class`,
      type: `Switch to comfort class`,
      price: 150,
      chosen: false,
    },
    {
      id: `meal`,
      type: `Add meal`,
      price: 2,
      chosen: false,
    },
    {
      id: `seats`,
      type: `Choose seats`,
      price: 9,
      chosen: false,
    },
  ],
  photos: [
    `img/photos/1.jpg`,
    `img/photos/2.jpg`,
    `img/photos/3.jpg`,
    `img/photos/4.jpg`,
    `img/photos/5.jpg`,
  ],
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  // функция для генерации карточки точки маршрута внутри дня
  render(point, mode) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;
    this._mode = mode;

    this._pointComponent = new PointComponent(point);
    this._pointEditComponent = new PointEditComponent(point);

    this._pointComponent.setEditButtonClickHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._pointEditComponent.getData();
      this._onDataChange(this, point, data);
    });

    this._pointEditComponent.setDeleteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, point, null);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldPointEditComponent && oldPointComponent) {
          replace(this._pointComponent, oldPointComponent);
          replace(this._pointEditComponent, oldPointEditComponent);
          this._replaceEditToPoint();
        } else {
          render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldPointEditComponent && oldPointComponent) {
          remove(oldPointComponent);
          remove(oldPointEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._pointEditComponent, RenderPosition.AFTERBEGINING);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  destroy() {
    remove(this._pointEditComponent);
    remove(this._pointComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      evt.preventDefault();
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyPoint, null);
      }
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _replacePointToEdit() {
    this._onViewChange();

    replace(this._pointEditComponent, this._pointComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToPoint() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._pointEditComponent.reset();

    replace(this._pointComponent, this._pointEditComponent);
    this._mode = Mode.DEFAULT;
  }
}
