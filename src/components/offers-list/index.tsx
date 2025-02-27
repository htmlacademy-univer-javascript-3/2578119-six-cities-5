import {CardSize, CardUse, Offer} from '../../types.ts';
import {Card} from '../card';

type Props = {
  offers: Offer[];
  size: CardSize;
  use: CardUse;
  onMouseEnter?(cardId: string): void;
  onMouseLeave?(): void;
}
export function OffersList({offers, size, use, onMouseEnter, onMouseLeave}: Props) {
  return (
    <>
      {offers.map((offer) => (
        <Card key={offer.id}
          offer={offer}
          size={size}
          use={use}
          onMouseEnter={() => onMouseEnter?.(offer.id)}
          onMouseLeave={() => onMouseLeave?.()}
        />)
      )}
    </>);
}
