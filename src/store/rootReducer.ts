import {combineReducers} from '@reduxjs/toolkit';
import {userReducer} from './reducers/userReducer.ts';
import {cityReducer} from './reducers/cityReducer.ts';
import {offersReducer} from './reducers/offersReducer.ts';
import {offerReducer} from './reducers/offerReducer.ts';
import {commentsReducer} from './reducers/commentsReducer.ts';
import {favoritesReducer} from './reducers/favoritesReducer.ts';
import {Actions} from '../utils/enums.ts';


const rootReducer = combineReducers({
  [Actions.User]: userReducer,
  [Actions.City]: cityReducer,
  [Actions.Offers]: offersReducer,
  [Actions.Offer]: offerReducer,
  [Actions.Comments]: commentsReducer,
  [Actions.Favorites]: favoritesReducer,
});

export {rootReducer};
