import {Rating, RatingClassType} from '../../utils/types.ts';

type Props = {
  block: RatingClassType;
  rating: Rating;
}

export function RatingItem({block, rating}: Props) {
  const ratingUnitInPercentage = 20;
  return (
    <div className={`${block}__rating rating`}>
      <div className={`${block}__stars rating__stars`}>
        <span style={{width: `${rating * ratingUnitInPercentage}%`}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}
