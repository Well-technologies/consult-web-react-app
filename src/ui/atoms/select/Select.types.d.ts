export type Option = {
    value: string | number;
    label: string;
    default?: true;
};
export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: Option[];
};
