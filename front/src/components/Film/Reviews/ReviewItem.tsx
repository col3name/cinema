import React from 'react';
import cn from 'classnames';

import Title from '@/components/Common/Tite/Title';
import Paragraph from '@/components/Common/Paragraph/Paragraph';

import styles from './stylesReviews.module.css';

import { Review } from '@/types/types';
import PhotoIcon from "@/components/Common/icons/photo";

export type ReviewItemPropsType = {
  review: Review,
  className?: string,
};

const ReviewItem: React.FC<ReviewItemPropsType> = ({
  review,
  className,
}) => {
  return (
    <div className={ cn(styles.reviewItem, className) }>
      { review.authorImage ? (
        <img
          className={ styles.reviewImage }
          src={ review.authorImage }
          alt="review author face"
        />
      ) : (
        <PhotoIcon />
      )}
      <div className={ styles.reviewContent }>
        <div className={ styles.reviewTitleWrapper }>
          <Title>{ review.name }</Title>
          <span>Оценка: <span className={ styles.reviewRating }>{ review.rating }</span></span>
        </div>
        <Paragraph>{ review.text }</Paragraph>
      </div>
    </div>
  )
}

export default ReviewItem;
