import {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {OffersList} from '../../components/offers-list';
import {Header} from '../../components/header';
import {Map} from '../../components/map';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {setCity, setOffers} from '../../store/action.ts';
import {offersMock} from '../../mocks/offers.ts';
import {CityList} from '../../components/city-list';
import {City} from '../../types.ts';

//  «Главная страница»
export function MainPage() {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);

  const [activeCardId, setActiveCardById] = useState<string | null>(null);
  const selectedOffer = offers.find((offer) => offer.id === activeCardId);

  useEffect(()=>{
    dispatch(setOffers(offersMock.filter((offer) => offer.city.name === currentCity.name)));
  },[currentCity, dispatch]);

  const handleChangeCity = (city: City) => {
    dispatch(setCity(city));
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList currentCity={currentCity} onChange={handleChangeCity}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {currentCity.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <OffersList
                  block={'cities'}
                  offers={offers}
                  size={'medium'}
                  onMouseEnter={setActiveCardById}
                  onMouseLeave={() => setActiveCardById(null)}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <Map
                block={'cities'}
                city={currentCity}
                points={offers}
                selectedPoint={selectedOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
