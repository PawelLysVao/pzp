import { PartialPageProps, Toast } from 'modules/Layout/type';
import { Action } from 'redux';

export const MANAGE_PAGE = 'LAYOUT/PAGE/MANAGE';
export const ADD_TOAST = 'LAYOUT/TOAST/ADD';
export const REMOVE_TOAST = 'LAYOUT/TOAST/REMOVE';

export type LayoutAction =
  | ManagePageAction
  | AddToastAction
  | RemoveToastAction;

export interface ManagePageAction extends Action<typeof MANAGE_PAGE> {
  payload: PartialPageProps;
}

export const managePageAction = (
  payload: PartialPageProps
): ManagePageAction => ({
  type: MANAGE_PAGE,
  payload
});

export type AddToastPayload = Omit<Toast, 'id'>;

export interface AddToastAction extends Action<typeof ADD_TOAST> {
  payload: AddToastPayload;
}

export const addToastAction = (payload: AddToastPayload): AddToastAction => ({
  type: ADD_TOAST,
  payload
});

export interface RemoveToastAction extends Action<typeof REMOVE_TOAST> {
  payload: string;
}

export const removeToastAction = (payload: string): RemoveToastAction => ({
  type: REMOVE_TOAST,
  payload
});
