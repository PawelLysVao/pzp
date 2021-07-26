import {
  DATE_FORMAT_VALUE,
  formatDateValue,
  formatTimeValue,
  TIME_FORMAT
} from 'modules/Shared/helper/utils';
import moment from 'moment';
import React from 'react';
import { Input } from 'reactstrap';
import './style.scss';

export interface DatetimeProps {
  name: string;
  id?: string;
  value?: string;
  min?: string;
  max?: string;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  onChange: (value: string) => void;
  hardcodedSeconds?: number;
}

const Datetime: React.FC<DatetimeProps> = ({
  name,
  id,
  value,
  min,
  max,
  required,
  disabled,
  invalid,
  onChange,
  hardcodedSeconds = null
}: DatetimeProps): JSX.Element => {
  const date = value ? formatDateValue(value) : '';
  const time = value ? formatTimeValue(value) : '';

  const rules = {
    min: {
      date: '',
      time: ''
    },
    max: {
      date: '',
      time: ''
    }
  };

  if (date) {
    const dateMoment = moment(value, DATE_FORMAT_VALUE);

    if (min) {
      rules.min.date = formatDateValue(min);

      if (moment(min, DATE_FORMAT_VALUE).diff(dateMoment, 'days') === 0) {
        rules.min.time = formatTimeValue(min);
      }
    }

    if (max) {
      rules.max.date = formatDateValue(max);

      if (moment(max, DATE_FORMAT_VALUE).diff(dateMoment, 'days') === 0) {
        rules.max.time = formatTimeValue(max);
      }
    }
  }

  return (
    <div className="datetime-wrapper">
      <Input
        type="date"
        name={`${name}.date`}
        id={`${id ?? name}.date`}
        value={date}
        min={rules.min.date}
        max={rules.max.date}
        required={required}
        disabled={disabled}
        invalid={invalid}
        onChange={(event) =>
          onChange(
            event.target.value
              ? `${event.target.value} ${time || moment().format(TIME_FORMAT)}`
              : ''
          )
        }
      />
      <Input
        type="time"
        name={`${name}.time`}
        id={`${id ?? name}.time`}
        value={time}
        min={rules.min.time}
        max={rules.max.time}
        required={required}
        disabled={disabled}
        invalid={invalid}
        onChange={(event) =>
          onChange(
            event.target.value
              ? `${date || moment().format(DATE_FORMAT_VALUE)} ${
                  event.target.value
                }`
              : ''
          )
        }
      />
      {Boolean(hardcodedSeconds) && (
        <div className="mb-2 ml-2">{hardcodedSeconds} sekund</div>
      )}
    </div>
  );
};

export default Datetime;
