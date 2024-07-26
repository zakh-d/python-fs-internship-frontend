import { ReactElement, useState } from "react";


type PaginationProps = {
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({totalItems, itemsPerPage, onPageChange}: PaginationProps): ReactElement => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const pageCount = Math.ceil(totalItems / itemsPerPage);

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
        onPageChange(page);
    }}>{page}</button></li>);

    return (
        <div>

            <ul className="pagination">
                {paginationLinks}
            </ul>
        </div>
    )
}

export default Pagination;