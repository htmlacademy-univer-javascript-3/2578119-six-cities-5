import {SortName} from '../../utils/enums.ts';
import {useState} from 'react';

type Props = {
  currentFilter: SortName;
  onFilterChange(filter: SortName): void;
}

export function SortFilter({currentFilter, onFilterChange}: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}
        onClick={() => setOpened((prev) => !prev)}
      >
        {currentFilter}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${opened ? 'places__options--opened' : null}`}>
        {Object.values(SortName).map((filter) => (
          <li key={filter}
            className={`places__option ${filter === currentFilter ? 'places__option--active' : null}`}
            tabIndex={0}
            onClick={() => {
              onFilterChange(filter);
              setOpened(false);
            }}
          >
            {filter}
          </li>
        ))}
      </ul>
    </form>
  );
}
