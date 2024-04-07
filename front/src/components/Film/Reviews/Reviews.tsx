import React from 'react';
import cn from 'classnames';

import ReviewItem from '@/components/Film/Reviews/ReviewItem';

import styles from './stylesReviews.module.css';

import {Review} from '@/shared/types';
import {useFilmReviews, useFilmReviewsSelector} from "@/redux/features/film/hooks";
import DataHOC from "@/components/Common/DataHOC";

export type ReviewsPropsType = {
  className?: string,
  filmId: string,
};

const Reviews: React.FC<ReviewsPropsType> = ({
  className,
  filmId,
}) => {
  const {
    isLoading,
    error,
  } = useFilmReviews(filmId);

  const reviews: Review[] = useFilmReviewsSelector(filmId);

  return (
    <DataHOC
      data={reviews}
      isLoading={isLoading}
      loaderText="reviews"
      error={error}
    >
      <ol className={cn(styles.reviewList, className)}>
        {reviews?.map((review: Review, index: number) => (
          <ReviewItem
            key={index}
            review={review}
          />
        ))}
      </ol>
    </DataHOC>
  )
};

export default Reviews;