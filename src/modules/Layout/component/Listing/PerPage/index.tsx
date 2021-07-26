import PerPage from 'modules/Layout/component/Pagination/PerPage';
import { PaginationParams, PartialSearchingProps } from 'modules/Shared/type';
import React, { ReactNode } from 'react';

export type Props = {
  pagination: PaginationParams;
  setParams: (params: PartialSearchingProps) => void;
};

export class ListingPerPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(count: string): void {
    const { setParams, pagination: currentPagination } = this.props;

    const pagination = { ...currentPagination, count: Number(count) };

    setParams({ pagination });
  }

  render(): ReactNode {
    const { pagination } = this.props;

    if (pagination) {
      return <PerPage pagination={pagination} onChange={this.onChange} />;
    }

    return null;
  }
}

export default ListingPerPage;
