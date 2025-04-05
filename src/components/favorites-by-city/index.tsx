import {Offer} from '../../utils/types.ts';
import {OffersList} from '../offers-list';

type Props = {
  city: string;
  favorites: Offer[];
}

export function FavoritesByCity({city, favorites}: Props) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        <OffersList offers={favorites} size={'small'} block={'favorites'}/>
      </div>
    </li>
  );
}
