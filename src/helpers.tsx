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
