import React, { useEffect, useState } from "react";
import { Button, Htag, P, Rating, Tag } from "../components";

export default function Home(): JSX.Element {

	const [counter, setCounter] = useState<number>(0);

	useEffect(() => {
		console.log(`Запустилось основное body ${counter}`);
		return function cleanup() {
			console.log(`Запустился cleanup ${counter}`);
		};
		// eslint-disable-next-line
	}, []);
	return (
		<>
			<Htag tag='h1'>{counter}</Htag>
			<Button appearance="primary" arrow="right" onClick={() => setCounter(counter + 1)}>Кнопка +1</Button>
			<Button appearance="ghost" arrow="down" onClick={() => setCounter(counter - 1)}>Кнопка -1</Button>
			<P size="s">Маленький</P>
			<P>Средний</P>
			<P size="l">Большой</P>
			<Tag size='m' color="red" >Red</Tag>
			<Tag size='s' color="green" >Green</Tag>
			<Tag size='s' color="primary" href="https://www.google.com" >Primary</Tag>
			<Tag>Ничего</Tag>
			<Rating rating={4} />
		</>
	);
}
