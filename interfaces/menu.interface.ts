import { TopLevelCategory } from "./page.interface";

export interface PageItem {
    alias: string;
    title: string;
    _id: string;
    category: string;
}

export interface MenuItem {
    _id: {
        secondCategory: string; // Вторая категория меню (название)
    };
    isOpened?: boolean; // Добавили чтобы манипулировать состоянием открыто/закрыто
    pages: PageItem[];
}

export interface FirstLevelMenuItem {
    route: string;
    name: string;
    icon: JSX.Element;
    id: TopLevelCategory;
}
