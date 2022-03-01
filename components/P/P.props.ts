import { HTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface PProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
    children: ReactNode;
    size?: "s" | "m" | "l";
}
// ? в size означет что не обязательно кисать size='medium' в props потому что он у нас по умолчанию
