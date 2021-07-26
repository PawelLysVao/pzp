import Pagination from 'modules/Layout/component/Pagination';
import {
  PaginationParams,
  PartialSearchingProps,
  PathParams,
  SearchParams,
  SortParams
} from 'modules/Shared/type';
import React, { ReactNode } from 'react';

export interface Props {
  pagination: PaginationParams;
  currentCount: number;
  filter?: SearchParams;
  sort?: SortParams;
  path?: string;
  pathParams?: PathParams;
  setParams: (params: PartialSearchingProps) => void;
}

class ListingPagination extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(page: number): void {
    const { pagination, setParams } = this.props;

    setParams({ pagination: { ...pagination, page } });
  }

  render(): ReactNode {
    const { pagination, currentCount } = this.props;

    return (
      <Pagination
        pagination={pagination}
        currentCount={currentCount}
        onChange={this.onChange}
      />
    );
  }
}

export default ListingPagination;
