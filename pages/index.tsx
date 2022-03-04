import { GetStaticProps } from "next";
import React, { useState } from "react";
import { Button, Htag, P, Rating, Tag } from "../components";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";

function Home({ menu }: HomeProps): JSX.Element {

	const [rating, setRating] = useState<number>(4);

	return (
		<>
			<Htag tag='h1'>Заголовок</Htag>
			<Button appearance="primary" arrow="right">Кнопка</Button>
			<Button appearance="ghost" arrow="down">Кнопка</Button>
			<P size="s">Маленький</P>
			<P>Средний</P>
			<P size="l">Большой</P>
			<Tag size='m' color="red" >Red</Tag>
			<Tag size='s' color="green" >Green</Tag>
			<Tag size='s' color="primary" href="https://www.google.com" >Primary</Tag>
			<Tag>Ничего</Tag>
			<Rating rating={rating} isEditable setRating={setRating} />
			{/* <ul>
				{menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
			</ul> */}
		</>
	);
}

export default withLayout(Home);


export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory }); //Сразу переименовали data который мы получаем от сервера в menu
	return {
		props: {
			menu,
			firstCategory
		}
	};
}; // Мы получили пропсы среди которых menu и firstCategory и передали в качестве props в компонент Home. Этот компонент Home обернут в HOC withLayout. 

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[],
	firstCategory: number,
}