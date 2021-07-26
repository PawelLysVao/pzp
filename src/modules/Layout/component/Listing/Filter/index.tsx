import Filter from 'modules/Layout/component/Filter';
import { FilterInputType } from 'modules/Layout/type';
import {
  PaginationParams,
  PartialSearchingProps,
  SearchParams
} from 'modules/Shared/type';
import React, { ReactNode } from 'react';

export interface ListingFilterProps {
  inputs: FilterInputType[];
  filter: SearchParams;
  pagination?: PaginationParams;
  setParams: (params: PartialSearchingProps) => void;
}

class ListingFilter extends React.Component<ListingFilterProps> {
  constructor(props: ListingFilterProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(property: string, value: string): void {
    const { filter, pagination, setParams } = this.props;

    const params: PartialSearchingProps = {
      filter: { ...filter },
      pagination
    };

    if (value) {
      params.filter[property] = value;
    } else {
      delete params.filter[property];
    }

    setParams(params);
  }

  render(): ReactNode {
    const { inputs } = this.props;

    return <Filter inputs={inputs} onChange={this.onChange} />;
  }
}

export default ListingFilter;
