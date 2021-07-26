import { ColorVariants, SelectOption } from 'modules/Shared/type';

export const TOAST_CLOSE_IN = 4000;

export type PageType = 'loading' | '403' | '404' | '500';

export interface BreadcrumbItem {
  title: string;
  link?: string;
}

export type PageProps = {
  title: string;
  type?: PageType;
  breadcrumb?: BreadcrumbItem[];
};

export type PartialPageProps = Partial<PageProps>;

export interface Toast {
  id: string;
  header: string;
  body: string;
  color?: ColorVariants;
  closeIn?: number;
}

export interface FilterInputProps<T extends string> {
  type: T;
  property: string;
  value?: string | number;
  label: string;
  className?: string;
  min?: string;
  max?: string;
  onChange?: (value: string) => void;
  parseTo?: 'string' | 'number';
}

export type FilterInputTextProps = FilterInputProps<'text'>;

export type FilterInputNumberProps = FilterInputProps<'number'>;

export interface FilterInputRadioProps extends FilterInputProps<'radio'> {
  options: SelectOption[];
}

export type FilterInputDateProps = FilterInputProps<'date'>;

export type FilterDatetimeProps = FilterInputProps<'datetime'>;

export interface FilterSelectProps extends FilterInputProps<'select'> {
  options: SelectOption[];
}

export type FilterCheckboxProps = FilterInputProps<'checkbox'>;

export type FilterInputType =
  | FilterInputTextProps
  | FilterInputNumberProps
  | FilterInputRadioProps
  | FilterSelectProps
  | FilterInputDateProps
  | FilterDatetimeProps
  | FilterCheckboxProps;

export interface PasswordValues {
  password?: string;
  password_confirmation?: string;
}
