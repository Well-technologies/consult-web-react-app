export type PaginationProps = {
    className?: string;
    count: number;
    page: number;
    pageSize: number;
    onChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
};
