export type CardViewActionOption = {
    onClick: () => void;
    icon: JSX.Element;
    text: string;
    className?: string;
};
export type CardViewActionsProps = {
    options: CardViewActionOption[];
};
