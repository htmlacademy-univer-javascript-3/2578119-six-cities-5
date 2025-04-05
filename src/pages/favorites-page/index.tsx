import {Helmet} from 'react-helmet-async';
import {Header} from '../../components/header';
import {Offer} from '../../utils/types.ts';
import {getFavoritesByCity} from '../../utils/helpers.tsx';
import {FavoritesByCity} from '../../components/favorites-by-city';
import {AppRoutes} from '../../utils/enums.ts';
import {Link} from 'react-router-dom';

type Props = {
  offers: Offer[];
}

export function FavoritesPage({offers}: Props) {
  const favoritesByCity = getFavoritesByCity(offers);
  return (
    <div className="page">
      <Helmet>
        <title>6 cities - Favorites</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(favoritesByCity).map(([city, favorites]) =>
                <FavoritesByCity key={city} city={city} favorites={favorites}/>
              )}
            </ul>
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


