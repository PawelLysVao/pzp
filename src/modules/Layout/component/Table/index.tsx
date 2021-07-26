import classNames from 'classnames';
import _get from 'lodash/get';
import { SortParams } from 'modules/Shared/type';
import React from 'react';
import { Table as Tablestrap, TableProps as TablestrapProps } from 'reactstrap';
import './style.scss';

export interface TableCol<T = never> {
  property: Extract<keyof T, string> | string;
  label: React.ReactNode;
  sortable?: boolean;
  value?: (row: T, index: number) => React.ReactNode;
}

export interface TableProps<T = never> {
  cols: TableCol<T>[];
  rows?: T[];
  selected?: React.ReactText[];
  sort?: SortParams;
  colKey?: (column: TableCol<T>, index: number) => React.ReactText;
  rowKey?: (row: T, index: number) => React.ReactText;
  onSort?: (params: SortParams) => void;
  onRowClick?: (row: T) => void;
  tableProps?: TablestrapProps;
}

class Table<T = never> extends React.Component<TableProps<T>> {
  constructor(props: TableProps<T>) {
    super(props);

    this.getColSpan = this.getColSpan.bind(this);
    this.getValue = this.getValue.bind(this);
    this.getColKey = this.getColKey.bind(this);
    this.getRowKey = this.getRowKey.bind(this);
    this.getSortIcon = this.getSortIcon.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
    this.renderHeaders = this.renderHeaders.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderSortableHeader = this.renderSortableHeader.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  getColSpan(): number {
    const { cols } = this.props;

    return cols.length;
  }

  getValue(col: TableCol<T>, row: T, index: number): React.ReactNode {
    if (col.value) {
      return col.value(row, index);
    }

    return _get(row, col.property, null);
  }

  getColKey(col: TableCol<T>, index: number): string | number {
    const { colKey } = this.props;

    if (colKey) {
      return colKey(col, index);
    }

    return col.property;
  }

  getRowKey(row: T, index: number): string | number {
    const { rowKey } = this.props;

    if (rowKey) {
      return rowKey(row, index);
    }

    return `row-${index}`;
  }

  getSortIcon(property: string): React.ReactNode {
    const { sort } = this.props;

    if (sort.sort === property) {
      if (sort.sort_method === 'desc') {
        return <i className="fa fa-sort-down ml-2" />;
      }

      return <i className="fa fa-sort-up ml-2" />;
    }

    return <i className="fa fa-sort ml-2" />;
  }

  toggleSort(property: string): SortParams {
    const { sort } = this.props;

    const params: SortParams = {};

    if (sort.sort === property) {
      if (sort.sort_method === 'desc') {
        params.sort = property;
        params.sort_method = 'asc';
      }
    } else {
      params.sort = property;
      params.sort_method = 'desc';
    }

    return params;
  }

  renderHeaders(): React.ReactNode {
    const { cols } = this.props;

    return cols.map((col, index) => {
      return col.sortable
        ? this.renderSortableHeader(col, index)
        : this.renderHeader(col, index);
    });
  }

  renderHeader(col: TableCol<T>, index: number): React.ReactNode {
    return <th key={this.getColKey(col, index)}>{col.label}</th>;
  }

  renderSortableHeader(col: TableCol<T>, index: number): React.ReactNode {
    const { onSort } = this.props;

    const params = this.toggleSort(col.property);

    return (
      <th
        key={this.getColKey(col, index)}
        title={`Sortuj po ${col.label}`}
        role="button"
        onClick={() => onSort(params)}
      >
        <div className="d-flex justify-content-between align-items-center">
          {col.label}
          {this.getSortIcon(col.property)}
        </div>
      </th>
    );
  }

  renderRow(row: T, rowIndex: number): React.ReactNode {
    const { cols, selected, onRowClick } = this.props;

    const key = this.getRowKey(row, rowIndex);

    return (
      <tr
        key={key}
        className={classNames({ active: selected?.includes(key) })}
        onClick={() => onRowClick && onRowClick(row)}
      >
        {cols.map((col, colIndex) => {
          const value = this.getValue(col, row, rowIndex);
          return <td key={this.getColKey(col, colIndex)}>{value}</td>;
        })}
      </tr>
    );
  }

  render(): React.ReactNode {
    const { rows = [], tableProps } = this.props;

    return (
      <Tablestrap
        striped={tableProps?.striped ?? true}
        bordered={tableProps?.bordered ?? true}
        responsive={tableProps?.responsive ?? true}
        className={classNames('mb-0', tableProps?.className)}
        {...tableProps} /* eslint-disable-line react/jsx-props-no-spreading */
      >
        <thead>
          <tr>{this.renderHeaders()}</tr>
        </thead>
        {rows.length > 0 ? (
          <tbody>{rows.map(this.renderRow)}</tbody>
        ) : (
          <tfoot>
            <tr>
              <td colSpan={this.getColSpan()} className="text-center">
                No data
              </td>
            </tr>
          </tfoot>
        )}
      </Tablestrap>
    );
  }
}

export default Table;
