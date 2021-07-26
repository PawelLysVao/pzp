import _debounce from 'lodash/debounce';
import { Props } from 'modules/Layout/component/Filter/Input';
import Datetime from 'modules/Layout/component/Input/Datetime';
import { FilterDatetimeProps } from 'modules/Layout/type';
import { isValueDirty } from 'modules/Shared/helper/utils';
import React from 'react';
import { FormGroup, Label } from 'reactstrap';

export interface FilterDatetimeState {
  value: string;
}

class FilterDatetime extends React.Component<
  FilterDatetimeProps,
  FilterDatetimeState
> {
  protected debounceOnChange: (value: string) => void;

  constructor(props: FilterDatetimeProps) {
    super(props);

    this.state = { value: String(props?.value ?? '') };

    this.debounceOnChange = _debounce(props.onChange, 350);
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (isValueDirty(this.props, prevProps, ['value'])) {
      if (isValueDirty(this.props, this.state, ['value'])) {
        const { value } = this.props;

        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ value: String(value ?? '') });
      }
    }
  }

  render(): JSX.Element {
    const { property, label, className, max, min } = this.props;
    const { value } = this.state;

    return (
      <FormGroup className={className}>
        <Label for={property}>{label}</Label>
        <Datetime
          name={property}
          value={value ?? ''}
          min={min}
          max={max}
          onChange={(val) =>
            this.setState({ value: val }, () => this.debounceOnChange(val))
          }
        />
      </FormGroup>
    );
  }
}

export default FilterDatetime;
