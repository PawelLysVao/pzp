import { RootState } from 'app/reducer';
import ListingPerPage from 'modules/Layout/component/Listing/PerPage';
import { PartialSearchingProps, PaginationParams } from 'modules/Shared/type';
import {
  setUserListParamsAction,
  SetUserListParamsAction
} from 'modules/User/action/list';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export interface StateProps {
  pagination: PaginationParams;
}

export interface DispatchProps {
  setParams: (payload: PartialSearchingProps) => SetUserListParamsAction;
}

export type Props = StateProps & DispatchProps;

export const mapState = (state: RootState): StateProps => {
  const { pagination } = state.user.list;

  return { pagination };
};

export const mapDispatch = (dispatch: Dispatch): DispatchProps => ({
  setParams: (payload: PartialSearchingProps) =>
    dispatch(setUserListParamsAction(payload))
});

export default connect<StateProps, DispatchProps>(
  mapState,
  mapDispatch
)(ListingPerPage);
