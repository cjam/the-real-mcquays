import React from "react";
import { Link } from "gatsby";
import "./Pagination.scss"

export interface PaginationProps {
    rootPath?: string
    currentPage: number;
    numPages: number;
}

const Pagination: React.SFC<PaginationProps> = ({
    rootPath = "",
    currentPage,
    numPages
}) => {

    if(numPages === 1){
        return null;
    }
    const getLink = (link: string) => {
        return `${rootPath}${link === "" || link === "/" || link ==="/1" ? "" : `/${link}`}`
    }
    const isFirst = currentPage === 1 || !currentPage;
    const isLast = currentPage === numPages;
    const prevPage = `/${currentPage-1}`
    const nextPage = `/${currentPage+1}`

    return (
        <ul className="pagination">
            {!isFirst && (
                <li className="previous">
                    <Link to={getLink(prevPage)} rel="prev">
                        ← Previous Page
                    </Link>
                </li>
            )}
            {createRelevantPageLinks(currentPage, numPages).map(({ label, to }, i) => (
                <li
                    className="pages"
                    key={`pagination-number${i + 1}`}
                >
                    {to && (
                        <Link
                            to={getLink(`/${to}`)}
                            className={currentPage === to ? "active" : ""}
                        >
                            {label}
                        </Link>
                    )}
                    {!to && {label}}
                </li>
            ))}

            {!isLast && (
                <li className="next">
                    <Link to={getLink(nextPage)} rel="next">
                        Next Page →
                    </Link>
                </li>
            )}
        </ul>
    )
}

function createRelevantPageLinks(currentPage: number, numPages: number) {
    const visiblePageLinks: Array<{ to?: number, label: string }> = []
    const pushLink = (label: string | number, to?: number) => {
        visiblePageLinks.push({
            to,
            label: `${label}`
        })
    }
    if (numPages <= 10) {
        /* If there are not too much, show everything. */
        for (let i = 1; i <= numPages; i++) {
            pushLink(i, i);
        }
    } else {
        /* Always show beginning, end, current, and around current. */
        if (currentPage <= 5) {
            /* If beginning and current are not too far, we don't want to "dot dot" between them. */
            for (let i = 1; i < currentPage; i++) {
                pushLink(i, i)
            }
        } else {
            pushLink(1, 1)
            pushLink("...")
            pushLink(currentPage - 2, currentPage - 2)
            pushLink(currentPage - 1, currentPage - 1)
        }
        pushLink(currentPage, currentPage)
        if (currentPage >= numPages - 4) {
            /* If current and end are not too far, we don't want to "dot dot" between them. */
            for (let i = currentPage + 1; i < numPages; i++) {
                pushLink(i, i)
            }
        } else {
            pushLink(currentPage + 1, currentPage + 1)
            pushLink(currentPage + 2, currentPage + 2)
            pushLink("...")
        }
        if (currentPage !== numPages) {
            pushLink(numPages, numPages)
        }
    }
    return visiblePageLinks
}


export default Pagination;