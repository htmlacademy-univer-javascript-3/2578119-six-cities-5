import {CardClassType, CardSize, Offer} from '../../utils/types.ts';
import {Link, Navigate} from 'react-router-dom';
import {Actions, AppRoutes, AuthorizationStatus} from '../../utils/enums.ts';
import {formatType} from '../../utils/helpers.tsx';
import {RatingItem} from '../rating';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {changeFavorite} from '../../store/thunk.ts';

type Props = {
  offer: Offer;
  size: CardSize;
  block: CardClassType;
  onMouseEnter?(): void;
  onMouseLeave?(): void;
}
// «Карточка предложения»
export function Card({offer, size, block, onMouseEnter, onMouseLeave }: Props) {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state[Actions.User].authorizationStatus);

  const {id, title, type, previewImage, rating, price, isPremium, isFavorite} = offer;
  const sizeMap = {
    small: {width: 150, height: 110},
    medium: {width: 260, height: 200},
  };

  const onFavoriteClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      return <Navigate to={AppRoutes.Login} />;
    }
    dispatch(
      changeFavorite({
        offerId: offer.id,
        favoriteStatus: !offer.isFavorite,
      }),
    );
  };

  return (
    <article className={`${block}__card place-card`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoutes.OfferBase}/${id}`}>
          <img className="place-card__image" src={previewImage} width={sizeMap[size].width} height={sizeMap[size].height} alt="Place image"/>
        </Link>
      </div>
      <div className={`${block}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {authorizationStatus === AuthorizationStatus.Auth &&
            <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
              type="button"
              onClick={onFavoriteClick}
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              {isFavorite ? <span className="visually-hidden">In bookmarks</span> :
                <span className="visually-hidden">To bookmarks</span>}
            </button>}
        </div>
        <RatingItem block={'place-card'} rating={rating} />
        <h2 className="place-card__name">
          <Link to={`${AppRoutes.OfferBase}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{formatType(type)}</p>
      </div>
    </article>
  );
}
