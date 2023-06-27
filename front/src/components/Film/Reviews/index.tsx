import React from 'react';
import cn from 'classnames';

import ReviewItem from "@/components/Film/Reviews/ReviewItem";

import styles from './stylesReviews.module.css';

import {useSelector} from "react-redux";

export type ReviewsPropsType = {
  className?: string,
};

const Reviews: React.FC<ReviewsPropsType> = ({
  className,
}) => {
  const reviews = useSelector(state => state.films.reviews);
  return <div className={ cn(styles.reviewList, className)}>
    { reviews.map((review, index) => <ReviewItem
      key={ index }
      review={ review }
    /> ) }
  </div>;
};

export default Reviews;