import {Review} from '../../utils/types.ts';
import {createReducer} from '@reduxjs/toolkit';
import {setComments, setCommentsLoading} from '../action.ts';
import {LoadingStatus} from '../../utils/enums.ts';

type State = {
  comments: Review[];
  commentsLoadingStatus: LoadingStatus;
};

const initialState: State = {
  comments: [],
  commentsLoadingStatus: LoadingStatus.Init,
};

const commentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setCommentsLoading, (state, action) => {
      state.commentsLoadingStatus = action.payload;
    });
});

export {commentsReducer};
