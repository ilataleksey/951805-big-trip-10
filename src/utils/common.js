import moment from 'moment';


export const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD/MM/YY`);
};

export const formatDay = (date) => {
  return moment(date).format(`MMM D`);
};

export const duration = (length, unit) => {
  const eventDuration = {
    days: moment.duration(length).days(),
    hours: moment.duration(length).hours(),
    minutes: moment.duration(length).minutes(),
  };

  return eventDuration[unit];
};

export const formatDateHTML = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

export const isOneDay = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};

export const toCapitaliseFirstLetter = (word) => {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
};
