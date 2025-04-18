import {Review} from '../../utils/types.ts';
import {RatingItem} from '../rating';
import {dateToMonthWordYear, dateToYearMonthDay} from '../../utils/helpers.tsx';

type Props = {
  review: Review;
}
export function ReviewItem({review}: Props) {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <RatingItem block={'reviews'} rating={review.rating} />
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={dateToYearMonthDay(new Date(review.date))}>
          {dateToMonthWordYear(new Date(review.date))}
        </time>
      </div>
    </li>
  );
}
