import { PaginationParams } from 'modules/Shared/type';
import React from 'react';
import { PaginationItem, PaginationLink } from 'reactstrap';
import './style.scss';

let increment = 0;

export type PaginationItemType = 'next' | 'previous' | 'first' | 'last';

export interface PaginationProps {
  pagination: PaginationParams;
  currentCount: number;
  onChange: (page: number) => void;
}

export interface PaginationState {
  isOpen: boolean;
  page: number | null;
}

class Pagination extends React.PureComponent<PaginationProps, PaginationState> {
  protected readonly id: string;

  constructor(props: PaginationProps) {
    super(props);

    // eslint-disable-next-line no-plusplus
    this.id = `pagination-${++increment}`;

    this.state = {
      isOpen: false,
      page: null
    };

    this.gotoPage = this.gotoPage.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.renderPrevItem = this.renderPrevItem.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.renderNextItem = this.renderNextItem.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderStaticItem = this.renderStaticItem.bind(this);
    this.noAdditionalData = this.noAdditionalData.bind(this);
  }

  gotoPage(page: number): void {
    const { onChange } = this.props;

    this.setState(
      {
        isOpen: false,
        page: null
      },
      () => onChange(page)
    );
  }

  onClick(event: React.MouseEvent, page: number): void {
    event.preventDefault();

    this.gotoPage(page);
  }

  noAdditionalData(): boolean {
    const {
      pagination: { count },
      currentCount
    } = this.props;

    return currentCount < count;
  }

  onToggle(): void {
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen, page: null });
  }

  renderPrevItem(): React.ReactNode {
    const {
      pagination: { page }
    } = this.props;

    return this.renderItem(Number(page) - 1, false, page === 1, 'previous');
  }

  renderItems(): React.ReactNode {
    const {
      pagination: { page }
    } = this.props;

    return this.renderItem(Number(page), true, false);
  }

  renderNextItem(): React.ReactNode {
    const {
      pagination: { page }
    } = this.props;

    const nextPage = Number(page) + 1;

    return this.renderItem(nextPage, false, this.noAdditionalData(), 'next');
  }

  renderItem(
    page: number,
    active: boolean,
    disabled: boolean,
    type?: PaginationItemType
  ): React.ReactNode {
    const key = type ? `page-${type}` : `page-${page}`;

    return (
      <PaginationItem
        key={key}
        active={active}
        disabled={disabled}
        className={key}
      >
        <PaginationLink
          next={type === 'next'}
          previous={type === 'previous'}
          first={type === 'first'}
          last={type === 'last'}
          onClick={(event) => this.onClick(event, page)}
        >
          {type ? null : page}
        </PaginationLink>
      </PaginationItem>
    );
  }

  renderStaticItem(): React.ReactNode {
    return (
      <PaginationItem className="page-static">
        <PaginationLink onClick={this.onToggle}>...</PaginationLink>
      </PaginationItem>
    );
  }

  render(): React.ReactNode {
    return (
      <div className="pagination-wrapper" id={this.id}>
        <ul className="pagination pagination-nav" aria-label="pagination">
          {this.renderPrevItem()}
          {this.renderItems()}
          {this.renderNextItem()}
        </ul>
      </div>
    );
  }
}

export default Pagination;
