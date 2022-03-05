import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from './P.module.css';
import cn from "classnames";


export const TopPageComponent = ({ firstCategory, page, products }: TopPageComponentProps): JSX.Element => {
    return (
        <>
            {products && products.length}
        </>
    );
};

