import { PageProps, Toast } from 'modules/Layout/type';

export type LayoutState = {
  page: PageProps;
  showLoader: boolean;
  toasts: Toast[];
};

export const initLayoutState = (): LayoutState => ({
  page: {
    title: 'Welcome!',
    breadcrumb: [],
    type: null
  },
  showLoader: false,
  toasts: []
});
