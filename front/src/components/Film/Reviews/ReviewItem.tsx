import React from 'react';
import cn from 'classnames';
import Image from 'next/image'

import Title from '@/components/Common/Tite/Title';
import Paragraph from '@/components/Common/Paragraph/Paragraph';
import PhotoIcon from '@/components/Common/icons/photo';

import styles from './stylesReviews.module.css';

import { Review } from '@/types/types';

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
        <Image
          className={ styles.reviewImage }
          src={ review.authorImage }
          alt="review author face"
          width={320}
          height={240}
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
