import { Action } from 'redux';
import { PartialSearchingProps, SearchParams } from 'modules/Shared/type';

export const MANAGE_THROW = 'SHARED/THROW/MANAGE';
export const SET_LOCATION_SEARCH = 'SHARED/LOCATION/SEARCH';

export interface ManageThrowAction extends Action<typeof MANAGE_THROW> {
  error: Error;
}

export const manageThrow = (error: Error): ManageThrowAction => ({
  type: MANAGE_THROW,
  error
});

export type SetLocationSearchPayload = {
  searchParams: SearchParams;
  merge?: boolean;
};

export interface SetLocationSearchAction
  extends Action<typeof SET_LOCATION_SEARCH> {
  payload: SetLocationSearchPayload;
}

export const setLocationSearchAction = (
  payload: SetLocationSearchPayload
): SetLocationSearchAction => {
  const { searchParams, merge = false } = payload;

  return {
    type: SET_LOCATION_SEARCH,
    payload: { searchParams, merge }
  };
};

export interface SetSearchingParamsAction<T extends string = string>
  extends Action<T> {
  payload: PartialSearchingProps;
}

export function setSearchingParamsAction<T extends string>(
  type: T,
  payload: PartialSearchingProps
): SetSearchingParamsAction<T> {
  return { type, payload };
}
