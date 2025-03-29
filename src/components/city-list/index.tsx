import {cities} from '../../constants/cities.ts';
import {City} from '../../types.ts';

type Props = {
  currentCity: City;
  onChange(city: City): void;
}

export function CityList({currentCity, onChange}: Props) {

  return (
    <ul className="locations__list tabs__list">
      {
        Object.entries(cities).map(([cityName, city]) => (
          <li key={city.name} className="locations__item">
            <a
              className={`locations__item-link tabs__item ${(city.name === currentCity.name) ? 'tabs__item--active' : null}`}
              onClick={() => {
                onChange(city);
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
