import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from './TopPageComponent.module.css';
import cn from "classnames";
import { Advantages, HhData, Htag, P, Product, Sort, Tag } from "../../components";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { SortEnum } from "../../components/Sort/Sort.props";
import { sortReducer } from "./sort.reducer";
import { useReducer } from "react";

export const TopPageComponent = ({ firstCategory, page, products }: TopPageComponentProps): JSX.Element => {

    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });
    const setSort = (sort: SortEnum) => {
        dispatchSort({ type: sort });
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                {products && <Tag size='m' color='gray'>{products.length}</Tag>}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div>
                {sortedProducts && sortedProducts.map(p => (<Product key={p._id} product={p} />))}
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
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} ></div>}
            <Htag tag="h2">Получаемые навыки</Htag>
            {page.tags.map(tag => <Tag key={tag} color="primary" className={styles.tag}>{tag}</Tag>)}
        </div>
    );
}; // Если есть products то возвращаем Tag

