import { useEffect, useState, KeyboardEvent } from "react";
import { RatingProps } from "./Rating.props";
import styles from './Rating.module.css';
import cn from "classnames";
import StarIcon from './star.svg';


export const Rating = ({ isEditable = false, rating, setRating, ...props }: RatingProps): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>)); // Создали стейт в котором как начальное значение создали массив который мы сразу заполнили 5 фрагментами
    useEffect(() => {
        constructRating(rating);
    }, [rating]);

    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
            return (
                <span className={cn(styles.star, {
                    [styles.filled]: i < currentRating, // index равен 0 до 4, currentRating от 1 до 5, => условие строго меньше
                    [styles.editable]: isEditable
                })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    //Навели мышь - показали залитые звезды (индекс + 1)
                    onMouseLeave={() => changeDisplay(rating)} //Убрали мышь - вернули в первоначальное отображение рейтинга
                    onClick={() => onSetRating(i + 1)} // Устанавливаем значние рейтинга
                >

                    < StarIcon
                        tabIndex={isEditable ? 0 : -1} // Когда будем табать по странице мы будем табать и по рейтингу если он Editable
                        onKeyDown={(event: KeyboardEvent<SVGElement>) => isEditable && handleSpace(i + 1, event)} //По нажатию на пробел устанавливается рейтинг (если он isEditable вызывается функция handleSpace)
                    />
                </span>

            );
        });
        setRatingArray(updatedArray);
    };
    // Функция чтобы заполнить стейт (r - rating/ i - index)
    const changeDisplay = (i: number) => {
        if (!isEditable) {
            return;
        }
        constructRating(i);
    };

    const onSetRating = (i: number) => {
        if (!isEditable || !setRating) {
            return;
        } // Если рейтинг не установлен и он у нас Editable
        setRating(i);
    };

    const handleSpace = (i: number, event: KeyboardEvent) => {
        if (event.code != 'Space' || !setRating) {
            return;
        } // Если нажатая кнопка не пробел то ничего не делать
        setRating(i);
    };

    return (
        <div {...props}>
            {ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
        </div>
    );
};
// [styles.fill]: index < currentRating - 