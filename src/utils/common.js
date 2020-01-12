import {MILSEC_IN_DAY, MILSEC_IN_HOUR, MILSEC_IN_MIN} from '../const.js';

const getFormat = (date) => {
  return {
    day: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
    month: date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
    fullYear: date.getFullYear(),
    year: date.getFullYear()
      .toString()
      .slice(-2),
    hours: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
    minutes: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
  };
};

export const formatTime = (date) => {
  return `${getFormat(date).day}/${getFormat(date).month}/${getFormat(date).year} ${getFormat(date).hours}:${getFormat(date).minutes}`;
};

export const formatTimeShort = (date) => {
  return `${getFormat(date).hours}:${getFormat(date).minutes}`;
};

export const formatTimeHTML = (date) => {
  return `${getFormat(date).fullYear}-${getFormat(date).month}-${getFormat(date).day}T${getFormat(date).hours}:${getFormat(date).minutes}`;
};

export const formatTimeHTMLShort = (date) => {
  return `${getFormat(date).fullYear}-${getFormat(date).month}-${getFormat(date).day}`;
};

export const getDuration = (date) => {
  const durationDays = Math.floor(date.duration / MILSEC_IN_DAY);
  const durationHours = Math.floor((date.duration % MILSEC_IN_DAY) / MILSEC_IN_HOUR);
  const durationMinutes = Math.floor(((date.duration % MILSEC_IN_DAY) % MILSEC_IN_HOUR) / MILSEC_IN_MIN);

  let durationD = ``;
  if (durationDays) {
    durationD = durationDays >= 10 ? `${durationDays}D` : `0${durationDays}D`;
  }

  let durationH = ``;
  if (durationHours) {
    durationH = durationHours >= 10 ? `${durationHours}H` : `0${durationHours}H`;
  }

  let durationM = ``;
  if (durationMinutes) {
    durationM = durationMinutes >= 10 ? `${durationMinutes}M` : `0${durationMinutes}M`;
  }

  return {
    days: durationD,
    hours: durationH,
    minutes: durationM
  };
};
