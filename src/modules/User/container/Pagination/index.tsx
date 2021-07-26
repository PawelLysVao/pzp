import { RootState } from 'app/reducer';
import ListingPagination from 'modules/Layout/component/Listing/Pagination';
import {
  PartialSearchingProps,
  PaginationParams,
  SearchParams,
  SortParams
} from 'modules/Shared/type';
import {
  setUserListParamsAction,
  SetUserListParamsAction
} from 'modules/User/action/list';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export interface StateProps {
  pagination: PaginationParams;
  filter: SearchParams;
  sort: SortParams;
  currentCount: number;
}

export interface DispatchProps {
  setParams: (payload: PartialSearchingProps) => SetUserListParamsAction;
}

export type Props = StateProps & DispatchProps;

export const mapState = (state: RootState): StateProps => {
  const { pagination, filter, sort, users } = state.user.list;

  return { pagination, filter, sort, currentCount: users.length };
};

export const mapDispatch = (dispatch: Dispatch): DispatchProps => ({
  setParams: (payload: PartialSearchingProps) =>
    dispatch(setUserListParamsAction(payload))
});

export default connect<StateProps, DispatchProps>(
  mapState,
  mapDispatch
)(ListingPagination);
