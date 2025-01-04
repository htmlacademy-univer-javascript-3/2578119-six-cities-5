import {createAction} from '@reduxjs/toolkit';
import {City, Offer, UserFull} from '../utils/types.ts';
import {Actions, AuthorizationStatus} from '../utils/enums.ts';

export const setCity = createAction<City>(`${Actions.CITY}/setCity`);

export const setOffers = createAction<Offer[]>(`${Actions.OFFERS}/setOffers`);
export const setOffersLoading = createAction<boolean>(`${Actions.OFFERS}/setOffersLoading`);

export const setAuthorizationStatus = createAction<AuthorizationStatus>(`${Actions.USER}/authorization`);
export const setUser = createAction<UserFull | null>(`${Actions.USER}/setUser`);
