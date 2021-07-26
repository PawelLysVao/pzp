import {
  setSearchingParamsAction,
  SetSearchingParamsAction
} from 'modules/Shared/action';
import { PartialSearchingProps } from 'modules/Shared/type';
import { UserEntity } from 'modules/User/model/User';
import { Action } from 'redux';

export const SET_USER_LIST_PARAMS = 'USER/LIST/PARAMS/SET';
export const UPDATE_USER_LIST_PARAMS = 'USER/LIST/PARAMS/UPDATE';
export const FETCH_USER_LIST = 'USER/LIST/FETCH';
export const USER_LIST_FETCHED = 'USER/LIST/FETCHED';

export type UserListAction =
  | SetUserListParamsAction
  | FetchUserListAction
  | UserListFetchedAction;

export type SetUserListParamsAction = SetSearchingParamsAction<
  typeof SET_USER_LIST_PARAMS
>;

export const setUserListParamsAction = (
  payload: PartialSearchingProps
): SetUserListParamsAction =>
  setSearchingParamsAction(SET_USER_LIST_PARAMS, payload);

export type FetchUserListAction = Action<typeof FETCH_USER_LIST>;

export const fetchUserListAction = (): FetchUserListAction => ({
  type: FETCH_USER_LIST
});

export type UserListFetchedPayload = {
  users: UserEntity[];
};

export interface UserListFetchedAction
  extends Action<typeof USER_LIST_FETCHED> {
  payload: UserListFetchedPayload;
}

export const userListFetchedAction = (
  payload: UserListFetchedPayload
): UserListFetchedAction => ({
  type: USER_LIST_FETCHED,
  payload
});
