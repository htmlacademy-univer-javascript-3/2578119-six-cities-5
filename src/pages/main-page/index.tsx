import {useMemo, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {OffersList} from '../../components/offers-list';
import {Header} from '../../components/header';
import {Map} from '../../components/map';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {setCity} from '../../store/action.ts';
import {CityList} from '../../components/city-list';
import {City} from '../../utils/types.ts';
import {LoadingStatus, SortName} from '../../utils/enums.ts';
import {SortFilter} from '../../components/sort-filter';
import {Spinner} from '../../components/spinner';

//  «Главная страница»
export function MainPage() {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const offersLoadingStatus = useAppSelector((state) => state.offersLoadingStatus);

  const [activeCardId, setActiveCardById] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<SortName>(SortName.Popular);

  const selectedOffer = offers.find((offer) => offer.id === activeCardId);

  const handleChangeCity = (city: City) => {
    dispatch(setCity(city));
  };

  const onFilterChange = (filter: SortName) => {
    setCurrentFilter(filter);
  };

  const sortedOffers = useMemo(() => {
    const offersByCity = offers.filter((offer) => offer.city.name === currentCity.name);
    switch (currentFilter) {
      case SortName.LowToHigh:
        return offersByCity.toSorted((a, b) => a.price - b.price);
      case SortName.HighToLow:
        return offersByCity.toSorted((a, b) => b.price - a.price);
      case SortName.TopRated:
        return offersByCity.toSorted((a, b) => b.rating - a.rating);
      default:
        return offersByCity;
    }
  }, [offers, currentFilter, currentCity]);

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
              <b className="places__found">{sortedOffers.length} places to stay in {currentCity.name}</b>
              <SortFilter currentFilter={currentFilter} onFilterChange={onFilterChange}/>
              {offersLoadingStatus === LoadingStatus.Pending
                ? <Spinner/> :
                <div className="cities__places-list places__list tabs__content">
                  <OffersList
                    block={'cities'}
                    offers={sortedOffers}
                    size={'medium'}
                    onMouseEnter={setActiveCardById}
                    onMouseLeave={() => setActiveCardById(null)}
                  />
                </div>}
            </section>
            <div className="cities__right-section">
              <Map
                block={'cities'}
                city={currentCity}
                points={sortedOffers}
                selectedPoint={selectedOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
