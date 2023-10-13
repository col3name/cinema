import React, {useEffect, useState} from 'react';
import cn from 'classnames';

import ReviewItem from '@/components/Film/Reviews/ReviewItem';

import styles from './stylesReviews.module.css';

import {Review} from '@/types/types';
import {useFilmReviews} from "@/redux/features/film/hooks";

export type ReviewsPropsType = {
  className?: string,
  filmId: string,
};

const Reviews: React.FC<ReviewsPropsType> = ({
  className,
  filmId,
}) => {
  const {reviews, updateReviews} = useFilmReviews(filmId);
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (isLoading) {
      return;
    }

    setLoading(true);
    updateReviews(filmId)
      .then(() => {
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filmId, isLoading, reviews.length]);
  return <div className={ cn(styles.reviewList, className)}>
    { reviews?.map((review: Review, index: number) => <ReviewItem
      key={ index }
      review={ review }
    /> ) }
  </div>;
};

export default Reviews;