import {TYPES} from '../const.js';
import {CITIES} from '../const.js';
import {URL} from '../const.js';
import {DESTINATIONS} from '../const.js';
import {OFFERS} from '../const.js';
import {MILSEC_IN_DAY} from '../const.js';

const PRICE = {
  min: 1,
  max: 1000,
};

const PHOTO_COUNT = {
  min: 1,
  max: 5,
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * max);
};

const getRandomDates = () => {
  const start = new Date();
  const end = new Date();

  const diffValueStart = getRandomIntegerNumber(0, 5 * MILSEC_IN_DAY);
  const diffValueEnd = getRandomIntegerNumber(0, 3 * MILSEC_IN_DAY);
  const diffValueAll = diffValueStart + diffValueEnd;

  start.setMilliseconds(start.getMilliseconds() + diffValueStart);
  end.setMilliseconds(start.getMilliseconds() + diffValueAll);

  const duration = end - start;

  return {
    start,
    end,
    duration,
  };
};

const generateOffers = (offers) => {
  return offers
    .map((offer) => {
      const newOffer = Object.assign({}, offer);
      const flag = Math.random() > 0.5;
      newOffer.chosen = flag;

      return newOffer;
    });
};

const generateDestination = (destinations) => {
  return destinations
    .filter(() => Math.random() > 0.5)
    .slice(0, 3)
    .join(` `);
};

const generatePhotos = (url) => {
  const photoCount = getRandomIntegerNumber(PHOTO_COUNT.min, PHOTO_COUNT.max);
  return new Array(photoCount)
    .fill(``)
    .map((element, i, arr) => {
      arr[i] = `${url}${Math.random()}`;
      return arr[i];
    });
};

const generateCard = () => {
  return {
    type: getRandomArrayItem(TYPES),
    destination: {
      city: getRandomArrayItem(CITIES),
      description: generateDestination(DESTINATIONS),
    },
    dates: getRandomDates(),
    price: getRandomIntegerNumber(PRICE.min, PRICE.max),
    isFavorite: Math.random() > 0.5,
    offers: generateOffers(OFFERS),
    photos: generatePhotos(URL),
  };
};

const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard)
    .sort((a, b) => {
      return a.dates.start - b.dates.start;
    });
};

export {generateCard, generateCards};
