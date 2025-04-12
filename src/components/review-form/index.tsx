import {ChangeEvent, FormEvent, useState} from 'react';
import {FormData} from '../../utils/types.ts';

type Props = {
  onSubmit(data: FormData): void;
}

export function ReviewForm({onSubmit}: Props) {
  const initialState:FormData = {rating: 0, comment: ''};
  const [formData, setFormData] = useState<FormData>(initialState);
  const ratingMap = {
    'perfect': 5,
    'good': 4,
    'not bad': 3,
    'badly': 2,
    'terribly': 1,
  };
  const REVIEW_MIN_LENGTH = 50;
  const isFormValid = !!formData.rating && !!formData.comment.length && formData.comment.length >= REVIEW_MIN_LENGTH;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);

    setFormData(initialState);
  };

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    if(evt.target.type === 'radio') {
      setFormData({... formData, [name]: Number(value)});
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const renderRating = ([title, rating]: [string, number]) => (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={rating}
        id={`${rating}-stars`}
        type="radio"
        checked={formData.rating === rating}
        onChange={handleFieldChange}
      />
      <label htmlFor={`${rating}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );

  return (
    <form className="reviews__form form" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="comment">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingMap).map(renderRating)}
      </div>
      <textarea className="reviews__textarea form__textarea" id="comment" name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleFieldChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and
        describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isFormValid} >Submit</button>
      </div>
    </form>
  );
}
