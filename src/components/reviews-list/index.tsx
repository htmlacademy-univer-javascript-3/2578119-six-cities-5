import {ReviewForm} from '../review-form';
import {ReviewItem} from '../review-item';
import {Review} from '../../types.ts';

type Props = {
  reviews: Review[];
}
export function ReviewsList({reviews}: Props) {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
      Reviews &middot;<span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review}/>
        ))}
      </ul>
      <ReviewForm/>
    </section>
  );
}
