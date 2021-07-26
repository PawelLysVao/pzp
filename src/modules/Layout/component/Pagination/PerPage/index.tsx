import classNames from 'classnames';
import { itemsPerPage } from 'modules/Shared/helper/params';
import { PaginationParams } from 'modules/Shared/type';
import React, { ReactNode } from 'react';
import { CustomInput, Label } from 'reactstrap';

export type PerPageProps = {
  className?: string;
  pagination: PaginationParams;
  onChange: (per_page: string) => void;
};

class PerPage extends React.Component<PerPageProps> {
  constructor(props: PerPageProps) {
    super(props);

    this.renderOptions = this.renderOptions.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  renderOptions(): ReactNode[] {
    return itemsPerPage.map((value) => (
      <option key={value} value={value}>
        {value}
      </option>
    ));
  }

  render(): ReactNode {
    const { className, pagination, onChange } = this.props;

    return (
      <div
        className={classNames(
          'per-page-wrapper d-inline-flex align-items-center',
          className
        )}
      >
        <Label for="count" className="mb-0">
          <CustomInput
            id="count"
            type="select"
            onChange={(event) => onChange(event.target.value)}
            value={pagination.count}
          >
            {this.renderOptions()}
          </CustomInput>
        </Label>
      </div>
    );
  }
}

export default PerPage;
