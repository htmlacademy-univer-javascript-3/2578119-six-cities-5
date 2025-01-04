export enum AppRoutes {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  OfferBase = '/offer',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export enum SortName {
  Popular = 'Popular',
  Low_to_high = 'Price: low to high',
  High_to_low = 'Price: high to low',
  Top_rated = 'Top rated first',
}

export enum Actions {
  CITY = 'City',
  OFFERS = 'Offers',
  OFFER = 'Offer',
  FAVORITES = 'Favorites',
  COMMENTS = 'Comments',
  USER = 'User'
}
