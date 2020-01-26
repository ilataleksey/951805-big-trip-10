export default class Points {
  constructor() {
    this._points = [];
  }

  getPoints() {
    return this._points;
  }

  setPoints(points) {
    this._points = Array.from(points);
  }

  updatePoint(id, point) {
    const pointIndex = this._points.findIndex((it) => it.id === id);

    if (pointIndex === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, pointIndex), point, this._points.slice(pointIndex + 1));

    return true;
  }
}
