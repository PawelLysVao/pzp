import React, { ReactNode } from 'react';
import { PartialSearchingProps, SearchingProps } from 'modules/Shared/type';
import { PageProps } from 'modules/Layout/type';
import { managePageAction, ManagePageAction } from 'modules/Layout/action';
import { Dispatch } from 'redux';
import { breadcrumbRouteUsers } from 'modules/User/breadcrumbs';
import { connect } from 'react-redux';
import Listing from 'modules/Layout/component/Listing';
import UserTable from 'modules/User/container/Table';
import UserFilter from 'modules/User/container/Filter';
import UserPagination from 'modules/User/container/Pagination';
import UserPerPage from 'modules/User/container/PerPage';
import User from 'modules/User/model/User';
import { createSearchingProps } from 'modules/Shared/helper/params';
import {
  setUserListParamsAction,
  SetUserListParamsAction
} from 'modules/User/action/list';

export interface StateProps {
  fetching: boolean;
}

export interface DispatchProps {
  managePage: (payload: PageProps) => ManagePageAction;
  setParams: (payload: PartialSearchingProps) => SetUserListParamsAction;
}

export type Props = StateProps & DispatchProps;

export const mapDispatch = (dispatch: Dispatch): DispatchProps => ({
  managePage: (payload: PageProps) => dispatch(managePageAction(payload)),
  setParams: (payload: PartialSearchingProps) =>
    dispatch(setUserListParamsAction(payload))
});

export class UsersListView extends React.Component<Props> {
  protected searchProps: SearchingProps;

  constructor(props: Props) {
    super(props);

    this.searchProps = createSearchingProps(
      window.location.hash,
      User.getFilterableAttributes(),
      User.getSortableAttributes()
    );
  }

  componentDidMount(): void {
    const { managePage, setParams } = this.props;

    managePage({
      title: 'Users - list',
      breadcrumb: breadcrumbRouteUsers()
    });

    setParams(this.searchProps);
  }

  render(): ReactNode {
    const { fetching } = this.props;
    const { filter } = this.searchProps;

    return (
      <div className="row users-view">
        <div className="col-12">
          <Listing
            table={<UserTable />}
            filter={<UserFilter values={filter} />}
            pagination={<UserPagination />}
            perPage={<UserPerPage />}
            loading={fetching}
          />
        </div>
      </div>
    );
  }
}

export default connect<null, DispatchProps>(null, mapDispatch)(UsersListView);
