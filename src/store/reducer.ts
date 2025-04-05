import {createReducer} from '@reduxjs/toolkit';
import {
  setAuthorizationStatus,
  setCity, setComments, setCommentsLoading, setNearbyOffers,
  setOffer,
  setOfferLoading,
  setOffers,
  setOffersLoading,
  setUser
} from './action.ts';
import {cities} from '../utils/cities.ts';
import {City, Offer, OfferFull, Review, UserFull} from '../utils/types.ts';
import {AuthorizationStatus, LoadingStatus} from '../utils/enums.ts';

type State = {
  user: UserFull | null;
  authorizationStatus: AuthorizationStatus;
  city: City;
  offers: Offer[];
  offer?: OfferFull;
  nearbyOffers: Offer[];
  comments: Review[];
  offersLoadingStatus: LoadingStatus;
  offerLoadingStatus: LoadingStatus;
  commentsLoadingStatus: LoadingStatus;
}

const initialState: State = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  city: cities.Paris,
  offers: [],
  nearbyOffers: [],
  comments: [],
  offersLoadingStatus: LoadingStatus.Init,
  offerLoadingStatus: LoadingStatus.Init,
  commentsLoadingStatus: LoadingStatus.Init,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoading, (state, action) => {
      state.offersLoadingStatus = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setOfferLoading, (state, action) => {
      state.offerLoadingStatus = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setCommentsLoading, (state, action) => {
      state.commentsLoadingStatus = action.payload;
    });
});

export {reducer};
