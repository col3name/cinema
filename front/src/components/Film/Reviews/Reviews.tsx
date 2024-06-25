import React, {useMemo} from "react";
import cn from "classnames";

import ReviewItem from "@/components/Film/Reviews/ReviewItem";

import styles from "./stylesReviews.module.css";

import {Review} from "@/shared/types";
import {
    useFilmReviews,
    useFilmReviewsSelector,
} from "@/redux/features/film/hooks";
import DataHOC from "@/components/Common/DataHOC";
import {Skeleton} from "@/components/Common/Skeleton";
import Title from "@/components/Common/Tite";
import Paragraph from "@/components/Common/Paragraph";

export type ReviewsPropsType = {
    className?: string;
    filmId: string;
};

type ReviewsSkeletonProps = {
    className?: string;
    count?: number;
}

const ReviewItemSkeleton = () => {
    return (
        <li className={styles.reviewItem}>
            <Skeleton width={100} height={100}/>
            <div className={styles.reviewContent}>
                <div className={styles.reviewTitleWrapper}>
                    <Skeleton width={100} height={32}/>
                    <Skeleton className={styles.reviewRating} width={100} height={32}/>
                </div>
                <Skeleton width={'80vw'} height={40}/>
            </div>
        </li>
    );
};

const ReviewsSkeleton: React.FC<ReviewsSkeletonProps> = ({
   count = 2,
}) => {
    const elements = useMemo(() => Array.from(Array(count).keys()).map((index: number) => <ReviewItemSkeleton key={index}/>), [count]);
    return (
        <ol className={styles.reviewList}>
            {elements}
        </ol>
    )
}

const Reviews: React.FC<ReviewsPropsType> = ({className, filmId}) => {
    const {isLoading, error} = useFilmReviews(filmId);
    // const { error} = useFilmReviews(filmId); const isLoading = true;

    const reviews: Review[] = useFilmReviewsSelector(filmId);


    return (
        <DataHOC
            data={reviews}
            isLoading={isLoading}
            loaderText="reviews"
            error={error}
            loaderComponent={ReviewsSkeleton}
        >
            <ol className={cn(styles.reviewList, className)}>
                {reviews?.map((review: Review, index: number) => (
                    <ReviewItem key={index} review={review}/>
                ))}
            </ol>
        </DataHOC>
    );
};

export default Reviews;
