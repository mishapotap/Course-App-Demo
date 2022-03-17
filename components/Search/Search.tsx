import { SearchProps } from "./Search.props";
import styles from './Search.module.css';
import cn from "classnames";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useState } from "react";
import GlassIcon from "./glass.svg";
import { useRouter } from "next/router";


export const Search = ({ className, ...props }: SearchProps): JSX.Element => {

    const [search, setSearch] = useState<string>('');
    const router = useRouter();

    const goToSearch = () => {
        router.push({
            pathname: '/search',
            query: {
                q: search
            }
        });
        // router.push Позволяет запушить новое значние url в state
    }; // Сказали перейти на путь /search и добавить query параметр который равен текущему значению поиска

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            goToSearch();
        }
    }; // Запускаем поиск по нажатию на Enter

    return (<div className={cn(styles.search, className)}
        {...props}
    >
        <Input
            className={styles.input}
            placeholder="Поиск..."
            value={search}
            onChange={(event) => setSearch(event.target.value)} // Записываем значение в state когда у нас меняется value (значние в строке поиска) NOTE: непонятно зачем перезаписывать state каждый раз вместо onEnter
            onKeyDown={handleKeyDown}
        />
        <Button appearance="primary" className={styles.button} onClick={goToSearch}><GlassIcon /></Button>
    </div>);
};

