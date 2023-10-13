import React from 'react';
import cn from 'classnames';

import ReviewItem from '@/components/Film/Reviews/ReviewItem';

import styles from './stylesReviews.module.css';

import {Review} from '@/types/types';
import {useAppSelector} from '@/redux/hooks';
import {RootState} from '@/redux/store';

export type ReviewsPropsType = {
  className?: string,
};

const Reviews: React.FC<ReviewsPropsType> = ({
  className,
}) => {
  const reviews: Review[] = useAppSelector((state: RootState) => state.films.reviews);
  return <div className={ cn(styles.reviewList, className)}>
    { reviews.map((review: Review, index: number) => <ReviewItem
      key={ index }
      review={ review }
    /> ) }
  </div>;
};

export default Reviews;