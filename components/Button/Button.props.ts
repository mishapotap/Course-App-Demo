import { HTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface ButtonProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode;
    appearance: "primary" | "ghost";
    arrow?: "right" | "down" | "none";
}
// extends сделали для того чтобы у элемента Button были все события которые возможно реализовать на кнопке

// type DetailedHTMLProps<A<T>, T>
// DetailedHTMLProps это generic который внутри имеет два параметра (первый из которых также является generic)

// arrow? означает что это значние не обязательное