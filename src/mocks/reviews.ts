import {Review} from '../types.ts';

export const reviews: Review[] = [
  {
    id: 1,
    date: new Date('2019-05-08T14:13:56.569Z'),
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  },
  {
    id: 2,
    date: new Date('2024-05-08T14:13:56.569Z'),
    user: {
      name: 'Ozer Fuant',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false
    },
    comment: 'Amsterdam. good',
    rating: 2
  }
];
