import { PProps } from "./P.props";
import styles from './P.module.css';
import cn from "classnames";
// Передаем в параграф размер и текст в качестве children и в результате получаем готовый параграф нужного размера


export const P = ({ children, size = "m", className, ...props }: PProps): JSX.Element => {
    return (<p className={cn(styles.p, className, {
        [styles.small]: size === 's',
        [styles.medium]: size === 'm',
        [styles.large]: size === 'l',
    })}
        {...props}
    >
        {children}
    </p>);
};

