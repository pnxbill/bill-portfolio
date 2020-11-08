import React, { useState } from 'react'
import PaginationComponent from 'react-js-pagination';

const Pagination = ({ count }) => {
  const [page, setPage] = useState(1);

  return (
    <PaginationComponent
      itemClass="page-item"
      linkClass="page-link"
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      onChange={page => setPage(page)}
    />
  )
}

export default Pagination
