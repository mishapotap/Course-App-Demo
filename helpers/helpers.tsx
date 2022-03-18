import CoursesIcon from "./icons/courses.svg";
import ServicesIcon from "./icons/services.svg";
import BooksIcon from "./icons/books.svg";
import ProductsIcon from "./icons/products.svg";
import { TopLevelCategory } from "../interfaces/page.interface";
import { FirstLevelMenuItem } from "../interfaces/menu.interface";

export const firstLevelMenu: FirstLevelMenuItem[] = [
    { route: "courses", name: "Курсы", icon: <CoursesIcon />, id: TopLevelCategory.Courses },
    { route: "services", name: "Сервисы", icon: <ServicesIcon />, id: TopLevelCategory.Services },
    { route: "books", name: "Книги", icon: <BooksIcon />, id: TopLevelCategory.Books },
    { route: "products", name: "Товары", icon: <ProductsIcon />, id: TopLevelCategory.Products },
];// Построили объект меню чтобы по нему прооходиться и строить меню а не хардкодить его

export const priceRub = (price: number): string => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' ₽');

// Ищем пустые строки не в начале и не в конце чтобы за ними шло число по 3 цифры но после того как мы нашли группы по 3 числа за ними бы не шло никакое другое число. И заменили это на пробел

export const declOfNumber = (number: number, titles: [string, string, string]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 5 < 5) ? number % 10 : 5]];
}; // Алгоритм сколонения слов (готовый)