import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from './TopPageComponent.module.css';
import cn from "classnames";
import { Advantages, HhData, Htag, P, Tag } from "../../components";
import { TopLevelCategory } from "../../interfaces/page.interface";


export const TopPageComponent = ({ firstCategory, page, products }: TopPageComponentProps): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                {products && <Tag size='m' color='gray'>{products.length}</Tag>}
                <span>Сортировка</span>
            </div>
            <div>
                {products && products.map(p => (<div key={p._id}>{p.title}</div>))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag="h2">{`Вакансии - ${page.category}`}</Htag>
                <Tag size='m' color='red'>hh.ru</Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
            {page.advantages && page.advantages.length > 0 && <>
                <Htag tag="h2">Преимущества</Htag>
                <Advantages advantages={page.advantages} />
            </>}
            {page.seoText && <P>{page.seoText}</P>}
            <Htag tag="h2">Получаемые навыки</Htag>
            {page.tags.map(tag => <Tag key={tag} color="primary" className={styles.tag}>{tag}</Tag>)}
        </div>
    );
}; // Если есть products то возвращаем Tag

