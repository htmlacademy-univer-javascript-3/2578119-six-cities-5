import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MainPage} from '../pages/main-page';
import {HelmetProvider} from 'react-helmet-async';
import {LoginPage} from '../pages/login-page';
import {PrivateRoute} from '../private-route';
import {AppRoutes, AuthorizationStatus} from '../utils/enums.ts';
import {FavoritesPage} from '../pages/favorites-page';
import {OfferPage} from '../pages/offer-page';
import {NotFoundPage} from '../pages/not-found-page';
import {Offer, Review} from '../utils/types.ts';
import {useEffect} from 'react';
import {checkAuth, getOffers} from '../store/thunk.ts';
import {useAppDispatch} from '../store/hooks.ts';

type Props = {
  favorites: Offer[];
  reviews: Review[];
}

export function App({favorites, reviews}: Props) {
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
    dispatch(getOffers());
  },[]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoutes.Main}
            element={<MainPage />}
          />
          <Route
            path={AppRoutes.Login}
            element={<LoginPage/>}
          />
          <Route
            path={AppRoutes.Favorites}
            element={
              <PrivateRoute>
                <FavoritesPage offers={favorites}/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.Offer}
            element={<OfferPage reviews={reviews}/>}
          />
          <Route
            path="*"
            element={<NotFoundPage/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>);
}

