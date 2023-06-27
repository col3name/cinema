import React from 'react';
import cn from 'classnames';

import ReviewItem from "@/components/Film/Reviews/ReviewItem";

import styles from './stylesReviews.module.css';

import { Review } from "@/types/types";

export type ReviewsPropsType = {
  className?: string,
  reviews: Review[],
};

const Reviews: React.FC<ReviewsPropsType> = ({
  className,
  reviews
}) => {
  return <div className={ cn(styles.reviewList, className)}>
    { reviews?.map((review, index) => <ReviewItem
      key={ index }
      review={ review }
    /> ) }
  </div>;
};

export default Reviews;