import { managePageAction, ManagePageAction } from 'modules/Layout/action';
import { PageProps } from 'modules/Layout/type';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export interface DashboardDispatchProps {
  managePage: (payload: PageProps) => ManagePageAction;
}

export type DashboardProps = DashboardDispatchProps;

export const mapDashboardDispatch = (
  dispatch: Dispatch
): DashboardDispatchProps => ({
  managePage: (payload: PageProps) => dispatch(managePageAction(payload))
});

export class Dashboard extends React.Component<DashboardProps> {
  componentDidMount(): void {
    const { managePage } = this.props;

    managePage({ title: 'Dashboard', breadcrumb: [] });
  }

  render(): React.ReactNode {
    return (
      <div className="dashboard-view row">
        <div className="col-12 font-24 font-weight-bold text-center">
          Welcome to fyta admin panel
        </div>
      </div>
    );
  }
}

export default connect<null, DashboardDispatchProps>(
  null,
  mapDashboardDispatch
)(Dashboard);
