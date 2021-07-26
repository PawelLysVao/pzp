import FilterCheckbox from 'modules/Layout/component/Filter/Checkbox';
import FilterDatetime from 'modules/Layout/component/Filter/Datetime';
import FilterInput from 'modules/Layout/component/Filter/Input';
import FilterInputRadio from 'modules/Layout/component/Filter/Radio';
import FilterInputSelect from 'modules/Layout/component/Filter/Select';
import { FilterInputType } from 'modules/Layout/type';
import { formatDateValue } from 'modules/Shared/helper/utils';
import React, { ReactNode } from 'react';
import { Card, CardBody } from 'reactstrap';

export interface Props {
  inputs: FilterInputType[];
  onChange: (property: string, value: string | number) => void;
}

class Filter extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.renderInput = this.renderInput.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(input: FilterInputType, property: string, value: string): void {
    const { onChange } = this.props;

    if (input.parseTo === 'number') {
      onChange(property, Number(value));
    } else if (input.parseTo === 'string') {
      onChange(property, String(value));
    } else {
      onChange(property, value);
    }
  }

  renderInput(input: FilterInputType): ReactNode {
    const { property, label, value, className } = input;

    switch (input.type) {
      case 'radio': {
        const { options, type } = input;

        return (
          <FilterInputRadio
            className={className || 'col-12'}
            key={property}
            type={type}
            property={property}
            label={label}
            value={value}
            options={options}
            onChange={(val) => this.onChange(input, property, val)}
          />
        );
      }

      case 'select': {
        const { options, type } = input;

        return (
          <FilterInputSelect
            className={className || 'col-12 col-sm-6 col-md-4 col-xl-2'}
            key={property}
            type={type}
            property={property}
            label={label}
            value={value}
            options={options}
            onChange={(val) => this.onChange(input, property, val)}
          />
        );
      }

      case 'text':
      case 'number': {
        const { type } = input;

        return (
          <FilterInput
            className={className || 'col-12 col-sm-6 col-md-4 col-xl-2'}
            key={property}
            type={type}
            property={property}
            label={label}
            value={value}
            onChange={(val) => this.onChange(input, property, val)}
          />
        );
      }

      case 'date': {
        const { type, min, max } = input;

        return (
          <FilterInput
            className={className || 'col-12 col-sm-6 col-md-4 col-xl-2'}
            key={property}
            type={type}
            property={property}
            label={label}
            value={value}
            min={min ? formatDateValue(min) : min}
            max={max ? formatDateValue(max) : max}
            onChange={(val) =>
              this.onChange(input, property, val ? formatDateValue(val) : val)
            }
          />
        );
      }

      case 'datetime': {
        const { type, min, max } = input;

        return (
          <FilterDatetime
            className={className || 'col-auto'}
            key={property}
            type={type}
            property={property}
            label={label}
            value={value}
            min={min}
            max={max}
            onChange={(val) => this.onChange(input, property, val)}
          />
        );
      }

      case 'checkbox': {
        const { type } = input;

        return (
          <FilterCheckbox
            className={className || 'col-12 col-sm-6 col-md-4 col-xl-2'}
            key={property}
            type={type}
            property={property}
            label={label}
            value={value}
            onChange={(val) => this.onChange(input, property, val)}
          />
        );
      }

      default: {
        return null;
      }
    }
  }

  render(): JSX.Element {
    const { inputs } = this.props;

    return (
      <div className="filter-wrapper">
        <Card>
          <CardBody className="row py-2">
            {inputs.map(this.renderInput)}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Filter;
