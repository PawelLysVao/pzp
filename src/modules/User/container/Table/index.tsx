import { RootState } from 'app/reducer';
import Table, { TableCol } from 'modules/Layout/component/Table';
import { PartialSearchingProps, SortParams } from 'modules/Shared/type';
import { setUserListParamsAction, SetUserListParamsAction } from 'modules/User/action/list';
import User from 'modules/User/model/User';
import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export interface StateProps {
  auth: User;
  users: User[];
  sort: SortParams;
}

export interface DispatchProps {
  setParams: (payload: PartialSearchingProps) => SetUserListParamsAction;
}

export interface Props extends StateProps, DispatchProps {
  onDeleteClick?: (user: User) => void;
}

export const mapState = (state: RootState): StateProps => {
  const { user: auth } = state.auth;
  const { users, sort } = state.user.list;

  return { auth, users, sort };
};

export const mapDispatch = (dispatch: Dispatch): DispatchProps => ({
  setParams: (payload: PartialSearchingProps) => dispatch(setUserListParamsAction(payload))
});

export class UserTable extends React.Component<Props> {
  readonly cols: TableCol<User>[];

  constructor(props: Props) {
    super(props);

    this.cols = [
      {
        property: 'id',
        label: 'Id'
      },
      {
        property: 'email',
        label: 'Email'
      },
      {
        property: 'username',
        label: 'Username',
        sortable: true
      }
    ];
  }

  render(): ReactNode {
    const { users, sort, setParams } = this.props;

    return <Table cols={this.cols} rows={users} sort={sort} onSort={(params) => setParams({ sort: params })} />;
  }
}

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(UserTable);
