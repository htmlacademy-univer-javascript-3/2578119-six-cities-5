import {cities} from '../../utils/cities.ts';
import {City} from '../../utils/types.ts';

type Props = {
  currentCity: City;
  onCityChange(city: City): void;
}

export function CityList({currentCity, onCityChange}: Props) {

  return (
    <ul className="locations__list tabs__list">
      {
        Object.entries(cities).map(([cityName, city]) => (
          <li key={city.name} className="locations__item">
            <a
              className={`locations__item-link tabs__item ${(city.name === currentCity.name) ? 'tabs__item--active' : null}`}
              onClick={() => {
                onCityChange(city);
              }}
            >
              <span>{cityName}</span>
            </a>
          </li>
        ))
      }
    </ul>
  );
}
