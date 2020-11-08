import React from 'react'
import PaginationComponent from 'react-js-pagination';

const Pagination = () => {
  return (
    <PaginationComponent
      itemClass="page-item"
      linkClass="page-link"
      activePage={1}
      itemsCountPerPage={10}
      totalItemsCount={50}
      pageRangeDisplayed={5}
      onChange={() => { }}
    />
  )
}

export default Pagination
