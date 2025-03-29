import {Offer} from './types.ts';

export function formatType(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function getFavoritesByCity(offers: Offer[]): Record<string, Offer[]> {
  const favoritesByCity = offers.reduce((cities, offer) => {
    (cities[offer.city.name] ||= []).push(offer);
    return cities;
  }, {} as Record<string, Offer[]>);

  return favoritesByCity;
}

export const dateToYearMonthDay = (date: Date) =>
  new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);

export const dateToMonthWordYear = (date: Date) =>
  new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'long'
  }).format(date);
