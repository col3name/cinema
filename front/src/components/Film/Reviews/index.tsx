import React, {useEffect, useState} from 'react';
import cn from 'classnames';

import ReviewItem from '@/components/Film/Reviews/ReviewItem';

import styles from './stylesReviews.module.css';

import {Review} from '@/types/types';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {RootState} from '@/redux/store';
import {setReviews} from '@/redux/features/filmSlice';
import {fetchReview} from '@/api/api';

export type ReviewsPropsType = {
  className?: string,
  filmId: string,
};

const Reviews: React.FC<ReviewsPropsType> = ({
  className,
  filmId,
}) => {
  const dispatch = useAppDispatch();
  const reviews: Review[] = useAppSelector((state: RootState) => state.films.reviews[filmId]) || [];
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (reviews.length > 0 && filmId) {
      return;
    }
    setLoading(true);
    dispatch(setReviews({ filmId, list: []}));
    fetchReview(filmId).then(reviews => {
      setLoading(false);
      dispatch(setReviews({ filmId, list: reviews }))
    })
      .catch(() => setLoading(false));
  }, [filmId, dispatch, isLoading, reviews.length]);
  return <div className={ cn(styles.reviewList, className)}>
    { reviews?.map((review: Review, index: number) => <ReviewItem
      key={ index }
      review={ review }
    /> ) }
  </div>;
};

export default Reviews;