import {LoadingStatus} from '../../utils/enums.ts';
import {Offer} from '../../utils/types.ts';
import {createReducer} from '@reduxjs/toolkit';
import {setFavorites, setFavoritesLoading} from '../action.ts';

type FavoritesState = {
  favorites: Offer[];
  favoritesLoadingStatus: LoadingStatus;
};

const initialState: FavoritesState = {
  favorites: [],
  favoritesLoadingStatus: LoadingStatus.Init,
};

const favoritesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(setFavoritesLoading, (state, action) => {
      state.favoritesLoadingStatus = action.payload;
    });
});

export {favoritesReducer};
