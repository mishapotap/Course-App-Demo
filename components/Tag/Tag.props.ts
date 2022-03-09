import { HTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
    size?: "s" | "m";
    color?: "primary" | "ghost" | "red" | "gray" | "green";
    href?: string;
}
// size? 22px или 25px
// href? - тег может быть как ссылкой так и просто тегом
