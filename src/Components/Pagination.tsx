import { ReactElement, useState } from "react";


type PaginationProps = {
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number, itemsPerPage: number) => void;
}

const Pagination = ({totalItems, itemsPerPage, onPageChange}: PaginationProps): ReactElement => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPageValue, setItemsPerPageValue] = useState(itemsPerPage);
    
    const pageCount = Math.ceil(totalItems / itemsPerPageValue) || 1;

    if (currentPage > pageCount) {
        setCurrentPage(pageCount);
        return <></>;
    }
    
    let displayedPages = new Array(pageCount).fill(0).map((_, index) => index + 1);

    if (pageCount > 10) {
        if (currentPage < 6) {
            displayedPages = displayedPages.slice(0, 10);
        } else {
            displayedPages = displayedPages.slice(currentPage - 5, currentPage + 5);
        }
    }

    const paginationLinks = displayedPages.map((page, index) => <li key={index} className={`page-item ${currentPage === page ? 'active' : ''}`}><button className="page-link" onClick={() => {
        setCurrentPage(page);
        onPageChange(page, itemsPerPageValue || itemsPerPage);
    }}>{page}</button></li>);

    return (
        <div>

            <ul className="pagination">
                {paginationLinks}
            </ul>
            <span>Items per page: </span>
            <input type="number"  value={itemsPerPageValue} onChange={(e) => {
                if (parseInt(e.target.value) < 1) {
                    return;
                }
                if (parseInt(e.target.value) > 25) {
                    return;
                }
                setItemsPerPageValue(parseInt(e.target.value));
                onPageChange(currentPage, parseInt(e.target.value));
            }}/>
        </div>
    )
}

export default Pagination;