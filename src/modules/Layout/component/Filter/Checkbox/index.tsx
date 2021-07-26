import _debounce from 'lodash/debounce';
import { FilterCheckboxProps } from 'modules/Layout/type';
import { isValueDirty } from 'modules/Shared/helper/utils';
import React, { ChangeEvent } from 'react';
import { CustomInput, FormGroup, Label } from 'reactstrap';

export type Props = FilterCheckboxProps;

export type State = {
  value: string | number;
};

class FilterCheckbox extends React.Component<Props, State> {
  protected debounceOnChange: (value: string) => void;

  constructor(props: Props) {
    super(props);

    this.state = { value: String(props?.value ?? '') };

    this.onChange = this.onChange.bind(this);
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

  onChange(event: ChangeEvent<HTMLInputElement>): void {
    const { checked } = event.target;

    const value = checked ? '1' : '';

    this.setState({ value }, () => this.debounceOnChange(value));
  }

  render(): JSX.Element {
    const { type, property, label, className } = this.props;
    const { value } = this.state;

    return (
      <FormGroup className={className}>
        <Label for={property}>{label}</Label>
        <CustomInput
          type={type}
          name={property}
          id={property}
          checked={value === '1'}
          onChange={this.onChange}
        />
      </FormGroup>
    );
  }
}

export default FilterCheckbox;
