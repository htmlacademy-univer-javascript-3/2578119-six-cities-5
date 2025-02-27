import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MainPage} from '../pages/main-page';
import {HelmetProvider} from 'react-helmet-async';
import {LoginPage} from '../pages/login-page';
import {PrivateRoute} from '../private-route';
import {AppRoutes, AuthorizationStatus} from '../constants/enum.ts';
import {FavoritesPage} from '../pages/favorites-page';
import {OfferPage} from '../pages/offer-page';
import {NotFoundPage} from '../pages/not-found-page';

type Props = {
  offersCount: number;
}

export function App({offersCount}: Props) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoutes.Main}
            element={<MainPage offersCount={offersCount}/>}
          />
          <Route
            path={AppRoutes.Login}
            element={<LoginPage/>}
          />
          <Route
            path={AppRoutes.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <FavoritesPage/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.Offer}
            element={<OfferPage/>}
          />
          <Route
            path="*"
            element={<NotFoundPage/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>);
}

