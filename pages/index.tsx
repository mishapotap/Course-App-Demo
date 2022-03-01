import React, { useState } from "react";
import { Button, Htag, P, Rating, Tag } from "../components";

export default function Home(): JSX.Element {

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
		</>
	);
}
