import {createAction} from '@reduxjs/toolkit';
import {City, Offer, OfferFull, Review, UserFull} from '../utils/types.ts';
import {Actions, AuthorizationStatus, LoadingStatus} from '../utils/enums.ts';

export const setCity = createAction<City>(`${Actions.City}/setCity`);

export const setOffers = createAction<Offer[]>(`${Actions.Offers}/setOffers`);
export const setOffersLoading = createAction<LoadingStatus>(`${Actions.Offers}/loading`);
export const setNearbyOffers = createAction<Offer[]>(`${Actions.Offers}/setNearbyOffers`);

export const setOffer = createAction<OfferFull | undefined>(`${Actions.Offer}/setOffer`);
export const setOfferLoading = createAction<LoadingStatus>(`${Actions.Offer}/loading`);

export const setComments = createAction<Review[]>(`${Actions.Comments}/setComments`);
export const setCommentsLoading = createAction<LoadingStatus>(`${Actions.Comments}/loading`);

export const setAuthorizationStatus = createAction<AuthorizationStatus>(`${Actions.User}/setAuthorizationStatus`);
export const setUser = createAction<UserFull | null>(`${Actions.User}/setUser`);

export const setFavorites = createAction<Offer[]>(`${Actions.Favorites}/setFavorites`);
export const setFavoritesLoading = createAction<LoadingStatus>(`${Actions.Favorites}/loading`);
