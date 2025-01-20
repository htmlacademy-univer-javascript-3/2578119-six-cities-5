import { UserFull} from '../../utils/types.ts';
import {AuthorizationStatus} from '../../utils/enums.ts';
import {createReducer} from '@reduxjs/toolkit';
import {setAuthorizationStatus, setUser} from '../action.ts';

type State = {
  user: UserFull | null;
  authorizationStatus: AuthorizationStatus;
}

const initialState: State = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});

export {userReducer};
