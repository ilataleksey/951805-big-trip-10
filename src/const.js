export const TYPES = [
  {
    action: `bus`,
    description: `Bus to `,
  },
  {
    action: `check-in`,
    description: `Check-In in `,
  },
  {
    action: `drive`,
    description: `Drive to `,
  },
  {
    action: `flight`,
    description: `Flight to `,
  },
  {
    action: `restaurant`,
    description: `Restaurant in `,
  },
  {
    action: `ship`,
    description: `Ship to `,
  },
  {
    action: `sightseeing`,
    description: `Sightseeing in `,
  },
  {
    action: `taxi`,
    description: `Taxi to `,
  },
  {
    action: `train`,
    description: `Train to `,
  },
  {
    action: `transport`,
    description: `Transport to `,
  },
  {
    action: `trip`,
    description: `Trip to `,
  },
];

export const CITIES = [
  `Geneva`,
  `Amsterdam`,
  `Chamonix`,
  `Krasnodar`,
  `Moscow`,
  `Saint Petersburg`,
  `London`,
  `New-York`,
  `Dubai`,
  `Paris`,
];

export const URL = `http://picsum.photos/300/150?r=`;

export const DESTINATIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

export const OFFERS = [
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
];

export const MONTHS = [
  `jan`,
  `feb`,
  `mar`,
  `apr`,
  `may`,
  `jun`,
  `jul`,
  `aug`,
  `sept`,
  `oct`,
  `nov`,
  `dec`,
];

export const MILSEC_IN_DAY = 86400000;
export const MILSEC_IN_HOUR = 3600000;
export const MILSEC_IN_MIN = 60000;

export const NEW_CARDS = [
  {
    id: `new-card`,
    type: {
      action: `flight`,
      description: `Flight to `,
    },
    city: `Geneva`,
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
        chosen: true,
      },
      {
        id: `class`,
        type: `Switch to comfort class`,
        price: 150,
        chosen: true,
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
      {
        id: `train`,
        type: `Travel by train`,
        price: 40,
        chosen: false,
      },
    ],
    dest: `Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.`,
    photos: [
      `img/photos/1.jpg`,
      `img/photos/2.jpg`,
      `img/photos/3.jpg`,
      `img/photos/4.jpg`,
      `img/photos/5.jpg`,
    ],
  }
];
