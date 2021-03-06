import moment from 'moment';


export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD/MM/YY`);
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
