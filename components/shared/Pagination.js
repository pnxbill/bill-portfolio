import React, { useState } from 'react'
import PaginationComponent from 'react-js-pagination';

const Pagination = () => {
  const [page, setPage] = useState(1);

  return (
    <PaginationComponent
      itemClass="page-item"
      linkClass="page-link"
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={50}
      pageRangeDisplayed={5}
      onChange={page => setPage(page)}
    />
  )
}

export default Pagination
