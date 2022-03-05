import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import axios from "axios";
import { withLayout } from "../../layout/Layout";
import { MenuItem } from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import { ParsedUrlQuery } from "node:querystring";


function Type({ firstCategory }: TypeProps): JSX.Element {
	return (
		<>
			Type: {firstCategory}
		</>
	);
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: firstLevelMenu.map(m => '/' + m.route),
		fallback: true,
	};
}; // Перебираем существующие тайпы которые у нас заданы

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
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
	} // Если есть то мы открываем меню
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory: firstCategoryItem.id }); //Сразу переименовали data который мы получаем от сервера в menu
	return {
		props: {
			menu,
			firstCategory: firstCategoryItem.id
		}
	};
}; // Мы получили пропсы среди которых menu и firstCategory и передали в качестве props в компонент Type. Этот компонент Type обернут в HOC withLayout. 

interface TypeProps extends Record<string, unknown> {
	menu: MenuItem[],
	firstCategory: number,
}