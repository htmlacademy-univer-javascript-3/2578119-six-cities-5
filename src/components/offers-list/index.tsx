import {CardSize, CardUse, Offer} from '../../types.ts';
import {Card} from '../card';
import {useState} from 'react';


type Props = {
  offers: Offer[];
  size: CardSize;
  use: CardUse;
}
export function OffersList({offers, size, use}: Props) {
  const [, setActiveCardId] = useState<string>();
  return (
    <>
      {offers.map((offer) => (
        <Card key={offer.id}
          offer={offer}
          size={size}
          use={use}
          onMouseEnter={() => setActiveCardId(offer.id)}
          onMouseLeave={() => setActiveCardId(undefined)}
        />)
      )}
    </>);
}
