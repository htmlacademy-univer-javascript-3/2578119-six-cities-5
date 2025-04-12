import {Offer} from '../../utils/types.ts';
import {LoadingStatus} from '../../utils/enums.ts';
import {createReducer} from '@reduxjs/toolkit';
import {setNearbyOffers, setOffers, setOffersLoading} from '../action.ts';

type State = {
  offers: Offer[];
  nearbyOffers: Offer[];
  offersLoadingStatus: LoadingStatus;
};

const initialState: State = {
  offers: [],
  nearbyOffers: [],
  offersLoadingStatus: LoadingStatus.Init,
};

const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoading, (state, action) => {
      state.offersLoadingStatus = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    });
});

export {offersReducer};
