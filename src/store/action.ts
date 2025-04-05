import {createAction} from '@reduxjs/toolkit';
import {City, Offer} from '../utils/types.ts';
import {Actions} from '../utils/enums.ts';

export const setCity = createAction<City>(`${Actions.CITY}/setCity`);
export const setOffers = createAction<Offer[]>(`${Actions.OFFERS}/setOffers`);
export const setOffersLoading = createAction<boolean>(`${Actions.OFFERS}/setOffersLoading`);
