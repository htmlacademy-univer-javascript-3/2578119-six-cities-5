import {Offer} from '../types.ts';
import {cities} from '../constants/cities.ts';

export const favorites: Offer[] = [
  {
    id: '1',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
    price: 180,
    city: cities.Amsterdam,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    isFavorite: true,
    isPremium: true,
    rating: 5,
    previewImage: 'img/apartment-small-03.jpg',
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'room',
    price: 80,
    city: cities.Amsterdam,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 4,
    previewImage: 'img/room-small.jpg',
  },
  {
    id: '3',
    title: 'White castle',
    type: 'apartment',
    price: 180,
    city: cities.Amsterdam,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 5,
    previewImage: 'img/apartment-small-04.jpg',
  },
];
