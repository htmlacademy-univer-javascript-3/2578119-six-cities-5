import {CardSize, CardUse, Offer} from '../../types.ts';
import {Link} from 'react-router-dom';
import {AppRoutes} from '../../constants/enum.ts';
import {formatType} from '../../helpers.tsx';

type Props = {
  offer: Offer;
  size: CardSize;
  use: CardUse;
  onMouseEnter?(): void;
  onMouseLeave?(): void;
}
// «Карточка предложения»
export function Card({offer, size, use, onMouseEnter, onMouseLeave }: Props) {
  const {id, title, type, previewImage, rating, price, isPremium, isFavorite} = offer;
  const ratingUnitInPercentage = 20;
  const sizeMap = {
    small: {width: 150, height: 110},
    medium: {width: 260, height: 200},
  };
  return (
    <article className={`${use}__card place-card`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${use}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoutes.OfferBase}/${id}`}>
          <img className="place-card__image" src={previewImage} width={sizeMap[size].width} height={sizeMap[size].height} alt="Place image"/>
        </Link>
      </div>
      <div className={`${use}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            {isFavorite ? <span className="visually-hidden">In bookmarks</span> :
              <span className="visually-hidden">To bookmarks</span>}
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * ratingUnitInPercentage}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoutes.OfferBase}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{formatType(type)}</p>
      </div>
    </article>
  );
}
