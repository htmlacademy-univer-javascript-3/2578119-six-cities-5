import {useEffect, useMemo, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {OffersList} from '../../components/offers-list';
import {Header} from '../../components/header';
import {Map} from '../../components/map';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {setCity, setOffers} from '../../store/action.ts';
import {offersMock} from '../../mocks/offers.ts';
import {CityList} from '../../components/city-list';
import {City} from '../../utils/types.ts';
import {SortName} from '../../utils/enums.ts';
import {SortFilter} from '../../components/sort-filter';

//  «Главная страница»
export function MainPage() {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);

  const [activeCardId, setActiveCardById] = useState<string | null>(null);
  const selectedOffer = offers.find((offer) => offer.id === activeCardId);

  const [currentFilter, setCurrentFilter] = useState<SortName>(SortName.Popular);

  useEffect(()=>{
    dispatch(setOffers(offersMock.filter((offer) => offer.city.name === currentCity.name)));
  },[currentCity, dispatch]);

  const handleChangeCity = (city: City) => {
    dispatch(setCity(city));
  };

  const onFilterChange = (filter: SortName) => {
    setCurrentFilter(filter);
  };

  const sortedOffers = useMemo(() => {
    switch (currentFilter) {
      case SortName.Low_to_high:
        return offers.toSorted((a, b) => a.price - b.price);
      case SortName.High_to_low:
        return offers.toSorted((a, b) => b.price - a.price);
      case SortName.Top_rated:
        return offers.toSorted((a, b) => b.rating - a.rating);
      default:
        return offers;
    }
  }, [offers, currentFilter]);

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
            <CityList currentCity={currentCity} onCityChange={handleChangeCity}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {currentCity.name}</b>
              <SortFilter currentFilter={currentFilter} onFilterChange={onFilterChange}/>
              <div className="cities__places-list places__list tabs__content">
                <OffersList
                  block={'cities'}
                  offers={sortedOffers}
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
