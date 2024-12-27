import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './app';
import {offers} from './mocks/offers.ts';
import {favorites} from './mocks/favorites.ts';
import {reviews} from './mocks/reviews.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={offers} favorites={favorites} reviews={reviews}/>
  </React.StrictMode>
);
