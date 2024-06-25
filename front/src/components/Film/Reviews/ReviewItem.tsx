import React from "react";
import cn from "classnames";
import Image from "next/image";

import Title from "@/shared/ui/Tite";
import Paragraph from "@/shared/ui/Paragraph";
import PhotoIcon from "@/shared/ui/icons/photo";

import styles from "./stylesReviews.module.css";

import { Review } from "@/shared/types";

export type ReviewItemPropsType = {
  review: Review;
  className?: string;
};

const ReviewItem: React.FC<ReviewItemPropsType> = ({ review, className }) => {
  return (
    <li className={cn(styles.reviewItem, className)}>
      {review.authorImage ? (
        <Image
          className={styles.reviewImage}
          src={review.authorImage}
          alt="review author face"
          width={320}
          height={240}
        />
      ) : (
        <PhotoIcon />
      )}
      <div className={styles.reviewContent}>
        <div className={styles.reviewTitleWrapper}>
          <Title>{review.name}</Title>
          <span>
            Оценка: <span className={styles.reviewRating}>{review.rating}</span>
          </span>
        </div>
        <Paragraph>{review.text}</Paragraph>
      </div>
    </li>
  );
};

export default ReviewItem;
