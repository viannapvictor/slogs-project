import { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import styled from 'styled-components';

interface Props {
    pageCount: number;
    onPageChange: (newPage: number) => void;
}

export default function Paginate({ pageCount, onPageChange }: Props): JSX.Element {
    const [page, setPage] = useState(0);

    const changePage = (newPage: number): void => {
        if (newPage < 0 || newPage > pageCount - 1) return;

        setPage(newPage);
        onPageChange(newPage);
    };

    return (
        <PaginatePages>
            <PageButton
                data-testid="page-button-left"
                $reachEnd={page === 0}
                onClick={() => {
                    changePage(page - 1);
                }}
            >
                <AiOutlineLeft />
            </PageButton>
            <PageInfo>{page + 1}</PageInfo>
            <PageButton
                data-testid="page-button-right"
                $reachEnd={page === pageCount - 1}
                onClick={() => {
                    changePage(page + 1);
                }}
            >
                <AiOutlineRight />
            </PageButton>
        </PaginatePages>
    );
}

const PaginatePages = styled.div`
    display: flex;
    justify-content: center;
    gap: 5px;
    align-items: center;
    align-self: center;
`;

const PageButton = styled.div<{
    $reachEnd: boolean;
}>`
    cursor: ${(props) => (props.$reachEnd ? 'default' : 'pointer')};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    color: ${(props) =>
        props.$reachEnd ? props.theme.paginate.arrow.reachEnd : props.theme.paginate.arrow.primary};
`;

const PageInfo = styled.p`
    padding: 5px;
    border-radius: 10px;
    font-family: 'Roboto', sans-serif;
`;
