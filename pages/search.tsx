import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";

function Search(): JSX.Element {
	return (
		<>
			search
		</>
	);
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory }); //Сразу переименовали data который мы получаем от сервера в menu
	return {
		props: {
			menu,
			firstCategory
		}
	};
}; // Мы получили пропсы среди которых menu и firstCategory и передали в качестве props в компонент Search. Этот компонент Search обернут в HOC withLayout. 

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[],
	firstCategory: number,
}