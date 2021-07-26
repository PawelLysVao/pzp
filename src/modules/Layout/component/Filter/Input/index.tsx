import _debounce from 'lodash/debounce';
import {
  FilterDatetimeProps,
  FilterInputDateProps,
  FilterInputNumberProps,
  FilterInputTextProps
} from 'modules/Layout/type';
import { isValueDirty } from 'modules/Shared/helper/utils';
import React, { ChangeEvent } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

export type Props =
  | FilterInputTextProps
  | FilterInputNumberProps
  | FilterInputDateProps
  | FilterDatetimeProps;

export type State = {
  value: string | number;
};

class FilterInput extends React.Component<Props, State> {
  protected debounceOnChange: (value: string) => void;

  constructor(props: Props) {
    super(props);

    this.state = { value: props?.value };

    this.onChange = this.onChange.bind(this);
    this.debounceOnChange = _debounce(props.onChange, 350);
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (isValueDirty(this.props, prevProps, ['value'])) {
      if (isValueDirty(this.props, this.state, ['value'])) {
        const { value } = this.props;

        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ value });
      }
    }
  }

  onChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;

    this.setState({ value }, () => this.debounceOnChange(value));
  }

  render(): JSX.Element {
    const { type, property, label, className, min, max } = this.props;
    const { value } = this.state;

    return (
      <FormGroup className={className}>
        <Label for={property}>{label}</Label>
        <Input
          type={type}
          name={property}
          id={property}
          value={value ?? ''}
          min={min}
          max={max}
          onChange={this.onChange}
        />
      </FormGroup>
    );
  }
}

export default FilterInput;
