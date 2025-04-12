import {ReviewItem} from '../review-item';
import {Review} from '../../utils/types.ts';

type Props = {
  reviews: Review[];
}
export function ReviewsList({reviews}: Props) {
  return (
    <>
      <h2 className="reviews__title">
      Reviews &middot;<span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review}/>
        ))}
      </ul>
    </>
  );
}
