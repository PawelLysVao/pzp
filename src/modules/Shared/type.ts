import { AddToastPayload } from 'modules/Layout/action';

export enum ColorVariants {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info'
}

export type Message = {
  value: string;
  variant: ColorVariants;
};

export type ValidationErrors = {
  [property: string]: string[] | ValidationErrors;
};

export type ValidationPayload = {
  message?: Message;
  errors?: ValidationErrors;
};

export type PaginationParams = {
  page?: number;
  count?: number;
};

export type SortOrder = 'asc' | 'desc';

export type SortParams = {
  sort?: string;
  sort_method?: SortOrder;
};

export type SearchParams = Record<string, string | number>;

export type SearchingProps = {
  pagination: PaginationParams;
  filter: SearchParams;
  sort: SortParams;
};

export type PartialSearchingProps = Partial<SearchingProps>;

export type PathParams = Record<string, string | number | boolean | undefined>;

export interface ToastMeta {
  success: AddToastPayload;
  error: AddToastPayload;
}

export interface SelectOption {
  value: string | number;
  label: string;
}
