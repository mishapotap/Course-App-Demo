import { useEffect, useState } from "react";
import { RatingProps } from "./Rating.props";
import styles from './Rating.module.css';
import cn from "classnames";
import StarIcon from './star.svg'


export const Rating = ({ isEditable = false, rating, setRating, className, ...props }: RatingProps): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>)); // Создали стейт в котором как начальное значение создали массив который мы сразу заполнили 5 фрагментами
    useEffect(() => {
        constructRating(rating);
    }, [rating]);

    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((rating: JSX.Element, index: number) => {
            return (
                < StarIcon className={cn(styles.star, {
                    [styles.filled]: index < currentRating
                })}
                />
            );
        });
        setRatingArray(updatedArray);
    }
    // Функция чтобы заполнить стейт
    return (
        <div {...props}>
            {ratingArray.map((rating, index) => (<span key={index}>{rating}</span>))}
        </div>
    );
};
// [styles.fill]: index < currentRating - index варьируется от 0 до 4, currentRating от 1 до 5, поэтому условие строго меньше