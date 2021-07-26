import _debounce from 'lodash/debounce';
import { FilterInputRadioProps } from 'modules/Layout/type';
import { isValueDirty } from 'modules/Shared/helper/utils';
import React, { ChangeEvent } from 'react';
import { CustomInput, FormGroup, Label } from 'reactstrap';

export type Props = FilterInputRadioProps;

export type State = {
  value: string | number;
};

class FilterInputRadio extends React.Component<Props, State> {
  protected debounceOnChange: (value: string) => void;

  constructor(props: Props) {
    super(props);

    this.state = { value: String(props?.value ?? '') };

    this.onChange = this.onChange.bind(this);
    this.debounceOnChange = _debounce(props.onChange, 350);
    this.renderRadio = this.renderRadio.bind(this);
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

  renderRadio(): React.ReactNode {
    const { type, property, options } = this.props;
    const { value } = this.state;

    return options.map((option) => {
      return (
        <CustomInput
          key={option.value}
          type={type}
          id={option.label}
          name={property}
          label={option.label}
          value={option.value.toString()}
          checked={option.value.toString() === value}
          onChange={this.onChange}
        />
      );
    });
  }

  render(): JSX.Element {
    const { property, label, className } = this.props;

    return (
      <FormGroup className={className}>
        <Label for={property}>{label}</Label>
        {this.renderRadio()}
      </FormGroup>
    );
  }
}

export default FilterInputRadio;
