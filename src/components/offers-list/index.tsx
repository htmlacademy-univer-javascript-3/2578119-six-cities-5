import {CardSize, CardClassType, Offer} from '../../types.ts';
import {Card} from '../card';

type Props = {
  offers: Offer[];
  size: CardSize;
  block: CardClassType;
  onMouseEnter?(cardId: string): void;
  onMouseLeave?(): void;
}
export function OffersList({offers, size, block, onMouseEnter, onMouseLeave}: Props) {
  return (
    <>
      {offers.map((offer) => (
        <Card key={offer.id}
          offer={offer}
          size={size}
          block={block}
          onMouseEnter={() => onMouseEnter?.(offer.id)}
          onMouseLeave={() => onMouseLeave?.()}
        />)
      )}
    </>);
}
