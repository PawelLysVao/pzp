import { RootState } from 'app/reducer';
import { CallHistoryMethodAction, replace } from 'connected-react-router';
import { Location, LocationDescriptorObject } from 'history';
import { managePageAction, ManagePageAction } from 'modules/Layout/action';
import { PageProps } from 'modules/Layout/type';
import User from 'modules/User/model/User';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export interface LocationState {
  reload?: boolean;
}

export interface DashboardStateProps {
  user: User;
  //layoutType: LayoutType;
  locationState: Location<LocationState>['state'] | null;
}

export interface DashboardDispatchProps {
  routerReplace: (location: LocationDescriptorObject<LocationState>) => CallHistoryMethodAction;
  managePage: (payload: PageProps) => ManagePageAction;
}

export type DashboardProps = DashboardDispatchProps & DashboardStateProps;

export const mapDashboardDispatch = (dispatch: Dispatch): DashboardDispatchProps => ({
  routerReplace: (location) => dispatch(replace(location)),
  managePage: (payload: PageProps) => dispatch(managePageAction(payload))
});

export const mapDashboardState = (state: RootState): DashboardStateProps => {
  const { user } = state.auth;
  //const { type: layoutType } = state.layout;
  const { state: locationState } = state.router.location;

  return {
    user,
    //layoutType,
    locationState
  };
};

export class Dashboard extends React.Component<DashboardProps> {
  componentDidMount(): void {
    const { managePage, locationState, routerReplace } = this.props;

    if (locationState?.reload === true) {
      routerReplace({ state: { reload: false } });

      window.location.reload();
    } else {
      managePage({ title: 'Dashboard', breadcrumb: [] });
    }
  }

  shouldComponentUpdate(nextProps: Readonly<DashboardProps>): boolean {
    const { locationState } = this.props;

    return !(locationState?.reload === true && nextProps.locationState?.reload === false);
  }

  render(): React.ReactNode {
    const { user, /*layoutType,*/ locationState } = this.props;

    if (locationState?.reload === true) {
      return null;
    }

    return (
      <div className="dashboard-view row">
        {/* <div className="col-12 col-xl-6">
          <Notifications />
        </div> */}
        {user && (
          /*layoutType &&*/ <div className="col-12 col-xl-6">
            Dashboard
            {/* <OrganizationDashboardLogs key={layoutType} /> */}
          </div>
        )}
      </div>
    );
  }
}

export default connect<DashboardStateProps, DashboardDispatchProps>(mapDashboardState, mapDashboardDispatch)(Dashboard);
