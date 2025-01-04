import {CityName} from './enums.ts';

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: Rating;
  previewImage: string;
}

export type City = {
  name: CityName;
  location: Location;
}

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type CardSize = 'small' | 'medium';

export type CardClassType = 'cities' | 'favorites' | 'near-places';

export type RatingClassType = 'reviews' | 'place-card';

export type MapClassType = 'cities' | 'offer';

export type FormData = {
  rating: Rating;
  review: string;
}

export type Point = {
  id: string;
  title: string;
  location: Location;
}

export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type UserFull = User & {
  email: string;
  token: string;
}

export type Review = {
  id: number;
  date: Date;
  user: User;
  comment: string;
  rating: Rating;
}

export type AuthData = {
  email: string;
  password: string;
}

export type ErrorMessage = {
  type: string;
  message: string;
};


