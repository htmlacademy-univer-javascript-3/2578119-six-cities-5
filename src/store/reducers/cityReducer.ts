import {City} from '../../utils/types.ts';
import {cities} from '../../utils/cities.ts';
import {createReducer} from '@reduxjs/toolkit';
import {setCity} from '../action.ts';

type State = {
  city: City;
};

const initialState: State = {
  city: cities.Paris,
};

const cityReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    });
});

export {cityReducer};
