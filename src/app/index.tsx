import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MainPage} from '../pages/main-page';
import {HelmetProvider} from 'react-helmet-async';
import {LoginPage} from '../pages/login-page';
import {PrivateRoute} from '../private-route';
import {AppRoutes, AuthorizationStatus} from '../constants/enum.ts';
import {FavoritesPage} from '../pages/favorites-page';
import {OfferPage} from '../pages/offer-page';
import {NotFoundPage} from '../pages/not-found-page';
import {Offer} from '../types.ts';

type Props = {
  offers: Offer[];
  favorites: Offer[];
}

export function App({offers, favorites}: Props) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoutes.Main}
            element={<MainPage offers={offers}/>}
          />
          <Route
            path={AppRoutes.Login}
            element={<LoginPage/>}
          />
          <Route
            path={AppRoutes.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavoritesPage offers={favorites}/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.Offer}
            element={<OfferPage offers={offers}/>}
          />
          <Route
            path="*"
            element={<NotFoundPage/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>);
}

