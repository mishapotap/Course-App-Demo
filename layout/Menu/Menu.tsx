import styles from './Menu.module.css';
import cn from "classnames";
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import CoursesIcon from "./icons/courses.svg";
import ServicesIcon from "./icons/services.svg";
import BooksIcon from "./icons/books.svg";
import ProductsIcon from "./icons/products.svg";
import { TopLevelCategory } from '../../interfaces/page.interface';

const firstLevelMenu: FirstLevelMenuItem[] = [
    { route: "courses", name: "Курсы", icon: <CoursesIcon />, id: TopLevelCategory.Courses },
    { route: "services", name: "Сервисы", icon: <ServicesIcon />, id: TopLevelCategory.Services },
    { route: "books", name: "Книги", icon: <BooksIcon />, id: TopLevelCategory.Books },
    { route: "products", name: "Товары", icon: <ProductsIcon />, id: TopLevelCategory.Products },
];// Построили объект меню чтобы по нему прооходиться и строить меню а не хардкодить его

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);

    const buildFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map(menu => (
                    <div key={menu.route}>
                        <a href={`/${menu.route}`}>
                            <div className={cn(styles.firstLevel, {
                                [styles.firstLevelActive]: menu.id == firstCategory //У нас будет firstLevelActive когда меню id совпадает с категорией. Тогда меню будет отображаться, в другом случае оно будет не активно
                            })}>{menu.icon}<span>{menu.name}</span></div>
                        </a>
                        {menu.id == firstCategory && buildSecondLevel(menu)}
                    </div>
                ))}
            </>);
    }; // Построили отображение первого уровня меню. Если active то можем стоить второй уровень
    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menu.map(m => (
                    <div key={m._id.secondCategory}>
                        <div className={styles.secondLevel}>{m._id.secondCategory}</div>
                        <div className={cn(styles.secondLevelBlock, {
                            [styles.secondLevelBlockOpened]: m.isOpened //Условие открытия меню (когда в isOpened true)
                        })}>
                            {buildThirdLevel(m.pages, menuItem.route)}
                        </div>
                    </div>
                ))}
            </div>
        );
    }; // Второй уровень строим после отображения первого уровня по перед тем как закрылся наш route
    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return (
            pages.map(p => (
                <a href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, {
                    [styles.thirdLevelActive]: false
                })}>
                    {p.category}
                </a>
            ))
        );
    };

    return (
        <div className={styles.menu}>
            {buildFirstLevel()}
            {/* <ul>
                {menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
            </ul> */}
        </div>
    );
};

// target="_blank" - чтобы открывалось в новом окне
