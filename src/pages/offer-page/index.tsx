import {Helmet} from 'react-helmet-async';
import {Navigate, useParams} from 'react-router-dom';
import {Header} from '../../components/header';
import {FormData} from '../../utils/types.ts';
import {Actions, AppRoutes, AuthorizationStatus, LoadingStatus} from '../../utils/enums.ts';
import {ReviewsList} from '../../components/reviews-list';
import {Map} from '../../components/map';
import {OffersList} from '../../components/offers-list';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {useCallback, useEffect} from 'react';
import {createComment, getComments, getOffer, getOffersNearby} from '../../store/thunk.ts';
import {setComments, setNearbyOffers, setOffer} from '../../store/action.ts';
import {Spinner} from '../../components/spinner';
import {RatingItem} from '../../components/rating';
import {ReviewForm} from '../../components/review-form';

export function OfferPage() {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const authorizationStatus = useAppSelector((state) => state[Actions.User].authorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const currentCity = useAppSelector((state) => state[Actions.City].city);

  const offer = useAppSelector((state) => state[Actions.Offer].offer);
  const offerLoadingStatus = useAppSelector((state) => state[Actions.Offer].offerLoadingStatus);

  const nearbyOffers = useAppSelector((state) => state[Actions.Offers].nearbyOffers);
  const offersLoadingStatus = useAppSelector((state) => state[Actions.Offers].offersLoadingStatus);

  const comments = useAppSelector((state) => state[Actions.Comment].comments);
  const commentsLoadingStatus = useAppSelector((state) => state[Actions.Comment].commentsLoadingStatus);

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(getOffer(id));

    return () => {
      dispatch(setOffer(undefined));
    };
  }, [id]);

  useEffect(() => {
    if (!id || !offer) {
      return;
    }
    dispatch(getOffersNearby(id));
    dispatch(getComments(id));

    return () => {
      dispatch(setNearbyOffers([]));
      dispatch(setComments([]));
    };
  }, [id, offer]);


  const onCreateComment = useCallback((form: FormData) => {
    if (!form || !offer) {
      return;
    }
    dispatch(createComment({offerId: offer.id, form}));
  }, [offer]);


  if(!id || (offerLoadingStatus === LoadingStatus.Error && !offer)){
    return <Navigate to={AppRoutes.NotFound} />;
  }
  return (
    <div className="page">
      <Helmet>
        <title>6 cities - Offer №{id}</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--offer">
        {offerLoadingStatus === LoadingStatus.Pending ? (
          <Spinner/>
        ) : (
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offer?.images?.map((image) => (
                  <div className="offer__image-wrapper" key={image}>
                    <img className="offer__image" src={image} alt="Photo studio"/>
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offer?.isPremium && (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offer?.title}
                  </h1>
                  {isAuthorized && (
                    <button className="offer__bookmark-button button" type="button">
                      <svg className="offer__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark"/>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  )}
                </div>
                {offer?.rating && <RatingItem block={'offer'} rating={offer.rating} showRatingValue/>}
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offer?.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer?.bedrooms}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    {offer?.maxAdults}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{offer?.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offer?.goods.map((good) => (
                      <li className="offer__inside-item" key={good}>
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={offer?.host.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{offer?.host.name}</span>
                    {offer?.host.isPro && (
                      <span className="offer__user-status">Pro</span>
                    )}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{offer?.description}</p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  {commentsLoadingStatus === LoadingStatus.Pending || !comments ? (
                    <Spinner/>
                  ) : (
                    <ReviewsList reviews={comments}/>
                  )}
                  {isAuthorized && <ReviewForm onSubmit={onCreateComment}/>}
                </section>
              </div>
            </div>
            {offer && <Map block={'offer'} city={currentCity} points={[...nearbyOffers.slice(0, 3), offer]} selectedPoint={offer}/>}
          </section>)}
        <div className="container">
          {offersLoadingStatus === LoadingStatus.Pending ? (
            <Spinner/>
          ) : (
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <OffersList block={'near-places'} offers={nearbyOffers} size={'medium'} />
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
