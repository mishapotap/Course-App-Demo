// Квадратные скобки значат что тут динамический Route ../courses/[alias]

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { withLayout } from "../../layout/Layout";
import axios from "axios";
import { MenuItem } from "../../interfaces/menu.interface";
import { TopLevelCategory, TopPageModel } from "../../interfaces/page.interface";
import { ParsedUrlQuery } from "node:querystring";
import { ProductModel } from "../../interfaces/product.interface";
import { firstLevelMenu } from "../../helpers/helpers";


function Course({ menu, page, products }: CourseProps): JSX.Element {
	return (
		<>
			{products && products.length}
		</>
	);
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = []; //Массив путей URL
	for (const m of firstLevelMenu) {
		const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory: m.id }); //Сделали 4 запроса
		paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)));// Добавляем в массив paths новый путь
	}
	return {
		paths, // Получили список путей URL (категории всех)
		fallback: true,
	};
}; // Когда мы будем получать пути мы будем делать 4 запроса


export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true
		};
	} // Если нет params то возвращаем 404 страницу
	const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
	if (!firstCategoryItem) {
		return {
			notFound: true
		};
	} // Если нет params то возвращаем 404 страницу
	try {
		const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory: firstCategoryItem.id }); //Получил меню
		if (menu.length == 0) {
			return {
				notFound: true
			};
		}
		const { data: page } = await axios.get<TopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias); //Получил страницу
		const { data: products } = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', {
			category: page.category,
			limit: 10
		}); //Получил страницу
		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id,
				page,
				products,
			}
		};
	} catch (error) {
		return {
			notFound: true
		};
	}
};

interface CourseProps extends Record<string, unknown> {
	menu: MenuItem[],
	firstCategory: TopLevelCategory,
	page: TopPageModel,
	products: ProductModel[],
}
