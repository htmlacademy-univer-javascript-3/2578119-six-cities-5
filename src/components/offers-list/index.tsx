import {Offer} from '../../types.ts';
import {Card} from '../card';
import {useState} from 'react';


type Props = {
  offers: Offer[];
}
export function OffersList({offers}: Props) {
  const [, setActiveCardId] = useState<string>();
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Card key={offer.id}
          offer={offer}
          onMouseEnter={() => setActiveCardId(offer.id)}
          onMouseLeave={() => setActiveCardId(undefined)}
        />)
      )}
    </div>);
}
