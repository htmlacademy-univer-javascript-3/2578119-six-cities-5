import {createReducer} from '@reduxjs/toolkit';
import {setCity, setOffers} from './action.ts';
import {cities} from '../constants/cities.ts';
import {City, Offer} from '../types.ts';

type State = {
  city: City;
  offers: Offer[];
}

const initialState: State = {
  city: cities.Paris,
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};
