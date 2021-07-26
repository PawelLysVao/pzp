import _debounce from 'lodash/debounce';
import { FilterSelectProps } from 'modules/Layout/type';
import { isValueDirty } from 'modules/Shared/helper/utils';
import React, { ChangeEvent } from 'react';
import { CustomInput, FormGroup, Label } from 'reactstrap';

export type Props = FilterSelectProps;

export interface State {
  value: string | number;
}

export class FilterInputSelect extends React.Component<Props, State> {
  protected debounceOnChange: (value: string) => void;

  constructor(props: Props) {
    super(props);

    this.state = { value: String(props?.value ?? '') };

    this.onChange = this.onChange.bind(this);
    this.debounceOnChange = _debounce(props.onChange, 350);
    this.renderSelectOptions = this.renderSelectOptions.bind(this);
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
    const { value } = event.target;

    this.setState({ value }, () => this.debounceOnChange(value));
  }

  renderSelectOptions(): React.ReactNode {
    const { options } = this.props;

    return options.map((option) => {
      return (
        <option key={option.value} value={option.value.toString()}>
          {option.label}
        </option>
      );
    });
  }

  render(): React.ReactNode {
    const { property, type, label, className } = this.props;
    const { value } = this.state;

    return (
      <FormGroup className={className}>
        <Label for={property}>{label}</Label>
        <CustomInput
          id={property}
          type={type}
          value={value ?? ''}
          onChange={this.onChange}
        >
          {this.renderSelectOptions()}
        </CustomInput>
      </FormGroup>
    );
  }
}

export default FilterInputSelect;
