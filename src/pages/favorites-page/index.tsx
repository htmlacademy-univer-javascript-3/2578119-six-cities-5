import {Helmet} from 'react-helmet-async';
import {Header} from '../../components/header';
import {getFavoritesByCity} from '../../utils/helpers.tsx';
import {FavoritesByCity} from '../../components/favorites-by-city';
import {Actions, AppRoutes, AuthorizationStatus, LoadingStatus} from '../../utils/enums.ts';
import {Link, Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {useEffect, useMemo} from 'react';
import {getFavorites} from '../../store/thunk.ts';

export function FavoritesPage() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state[Actions.Favorites].favorites);
  const favoritesLoadingStatus = useAppSelector((state) => state[Actions.Favorites].favoritesLoadingStatus);
  const favoritesByCity = useMemo(() => getFavoritesByCity(favorites), [favorites]);
  const isEmpty = favorites.length === 0;
  const authorizationStatus = useAppSelector((state) => state[Actions.User].authorizationStatus);

  useEffect(()=>{
    dispatch(getFavorites());
  },[]);

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return <Navigate to={AppRoutes.Login} />;
  }
  return (
    <div className={`page ${isEmpty ? 'page--favorites-empty' : ''}`}>
      <Helmet>
        <title>6 cities - Favorites</title>
      </Helmet>
      <Header />

      <main className={`page__main page__main--favorites ${isEmpty ? 'page__main--favorites-empty' : null }`}>
        <div className="page__favorites-container container">
          <section className={`favorites ${isEmpty ? 'favorites--empty' : null }`}>
            {((favoritesLoadingStatus === LoadingStatus.Error || favoritesLoadingStatus === LoadingStatus.Success) && isEmpty)
              ?
              <>
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
              </>
              :
              <>
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Object.entries(favoritesByCity).map(([city, favs]) =>
                    <FavoritesByCity key={city} city={city} favorites={favs}/>
                  )}
                </ul>
              </>}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link to={AppRoutes.Main} className="footer__logo-link">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}


