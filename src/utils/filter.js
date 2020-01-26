import {FILTER_TYPE} from '../const.js';

export const getFuturePoints = (points, date) => {
  return points.filter((point) => {
    const start = point.dates.start;

    return (start > date);
  });
};

export const getPastPoints = (points, date) => {
  return points.filter((point) => {
    const start = point.dates.start;

    return (start < date);
  });
};

export const getPointsByFilter = (points, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FILTER_TYPE.EVERYTHING:
      return points;
    case FILTER_TYPE.FUTURE:
      return getFuturePoints(points, nowDate);
    case FILTER_TYPE.PAST:
      return getPastPoints(points, nowDate);
  }

  return points;
};
