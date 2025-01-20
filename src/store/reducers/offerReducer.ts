import {OfferFull} from '../../utils/types.ts';
import {LoadingStatus} from '../../utils/enums.ts';
import {createReducer} from '@reduxjs/toolkit';
import {setOffer, setOfferLoading} from '../action.ts';

type State = {
  offer?: OfferFull;
  offerLoadingStatus: LoadingStatus;
};

const initialState: State = {
  offer: undefined,
  offerLoadingStatus: LoadingStatus.Init,
};

const offerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setOfferLoading, (state, action) => {
      state.offerLoadingStatus = action.payload;
    });
});

export {offerReducer};
