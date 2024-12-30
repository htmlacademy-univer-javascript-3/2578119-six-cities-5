import {createAction} from '@reduxjs/toolkit';
import {City, Offer} from '../types.ts';

export const setCity = createAction<City>('setCity');
export const setOffers = createAction<Offer[]>('setOffers');
