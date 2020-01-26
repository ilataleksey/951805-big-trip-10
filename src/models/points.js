import {getPointsByFilter} from '../utils/filter.js';
import {FILTER_TYPE} from '../const.js';

export default class Points {
  constructor() {
    this._points = [];

    this._activeFilterType = FILTER_TYPE.EVERYTHING;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getPointsAll() {
    return this._points;
  }

  getPoints() {
    return getPointsByFilter(this._points, this._activeFilterType);
  }

  setPoints(points) {
    this._points = Array.from(points);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  updatePoint(id, point) {
    const pointIndex = this._points.findIndex((it) => it.id === id);

    if (pointIndex === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, pointIndex), point, this._points.slice(pointIndex + 1));

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }
}
