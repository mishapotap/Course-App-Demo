import { ButtonProps } from "./Button.props";
import styles from './Button.module.css';
import ArrowIcon from './arrow.svg';
import cn from 'classnames';

export const Button = ({ children, appearance, arrow = 'none', className, ...props }: ButtonProps): JSX.Element => {
    return (
        //Класс будет скомбинирован (дефолтный класс button и класс primary если appearance = primary или ghost) 
        <button className={cn(styles.button, className, {
            [styles.primary]: appearance === 'primary',
            [styles.ghost]: appearance === 'ghost'
        })}
            {...props}
        >
            {children}
            {arrow !== 'none' && <span className={cn(styles.arrow, {
                [styles.down]: arrow === 'down'
            })}><ArrowIcon /></span>}
        </button>
    );
    // return (<></>);
};
// Если arrow не none то отрисовывается span
// Обьединили стили styles.arrow с применяем стили .down когда arrow === 'down'