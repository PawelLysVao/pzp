import Loader from 'modules/Layout/component/Loader';
import React, { ReactNode } from 'react';

export interface ListingProps {
  table: ReactNode;
  filter?: ReactNode;
  pagination?: ReactNode;
  perPage?: ReactNode;
  loading?: boolean;
  childrenNextToPagination?: ReactNode;
}

const Listing: React.FC<ListingProps> = (props: ListingProps): JSX.Element => {
  const {
    table,
    filter,
    pagination,
    perPage,
    childrenNextToPagination,
    loading = false
  } = props;

  return (
    <div className="listing-wrapper">
      {filter && <div className="filter-wrapper">{filter}</div>}
      <div className="table-wrapper position-relative">
        {loading && <Loader />}
        {table}
      </div>
      <div className="listing-pagination-wrapper mt-3 d-flex align-items-center flex-column flex-sm-row">
        {childrenNextToPagination}
        {pagination && <div className="mx-auto">{pagination}</div>}
        {perPage && <div className="mt-3 mt-sm-0">{perPage}</div>}
      </div>
    </div>
  );
};

export default Listing;
