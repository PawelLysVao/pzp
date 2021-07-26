import _isEqual from 'lodash/isEqual';
import _pick from 'lodash/pick';
import moment, { Moment } from 'moment';

export const DATE_FORMAT_VALUE = 'YYYY-MM-DD';
export const DATE_FORMAT = 'DD.MM.YYYY';
export const DATETIME_FORMAT_VALUE = 'YYYY-MM-DD HH:mm';
export const DATETIME_FORMAT = 'DD.MM.YYYY HH:mm';
export const DATETIME_SECONDS_FORMAT = 'DD.MM.YYYY HH:mm:ss';
export const TIME_FORMAT = 'HH:mm';

export const isValueDirty = (
  value: unknown,
  match: unknown,
  keys?: string[]
): boolean => {
  if (keys) {
    return !_isEqual(_pick(value, keys), _pick(match, keys));
  }

  return !_isEqual(value, match);
};

export const formatMoment = (date: Moment, format: string): string =>
  date.format(format);

export const formatDate = (date: string): string =>
  formatMoment(moment(date), DATE_FORMAT);

export const formatDateValue = (date: string, addDays?: number): string => {
  if (addDays) {
    return formatMoment(moment(date).add(addDays, 'days'), DATE_FORMAT_VALUE);
  }

  return formatMoment(moment(date), DATE_FORMAT_VALUE);
};

export const formatDatetimeValue = (date: string): string => {
  return formatMoment(moment(date), DATETIME_FORMAT_VALUE);
};

export const formatTimeValue = (date: string): string =>
  formatMoment(moment(date), TIME_FORMAT);

export const formatDatetime = (date: string): string =>
  formatMoment(moment(date), DATETIME_FORMAT);

export const formatDatetimeSeconds = (date: string): string =>
  formatMoment(moment(date), DATETIME_SECONDS_FORMAT);

export const formatForInput = (date: Moment): string =>
  date.format(DATE_FORMAT_VALUE);

export const formatDatetimeLocal = (datetimeLocal: string): string =>
  formatMoment(moment(datetimeLocal), 'Y-MM-DD HH:MM');

export const formatDatetimeLocalForInput = (datetimeLocal: string): string =>
  moment(datetimeLocal).format('Y-MM-DDTHH:MM');
