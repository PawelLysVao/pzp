import { ROUTE_DASHBOARD } from 'modules/Layout/routes';
import React from 'react';
import { Link } from 'react-router-dom';
import { RootState } from 'app/reducer';
import { connect } from 'react-redux';

export interface StateProps {
  authenticated: boolean;
}

export interface Props extends StateProps {
  errorCode: number;
  errorText: string;
}

export const mapState = (state: RootState): StateProps => {
  const { authenticated } = state.auth;

  return {
    authenticated
  };
};

export const Page: React.FC<Props> = (props: Props): JSX.Element => {
  const { errorCode, errorText, authenticated } = props;

  return (
    <div className={`page-${errorCode} row justify-content-center`}>
      <div className="col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-pattern">
          <div className="card-body">
            <div className="text-center mt-4">
              <h1 className="text-error">{errorCode}</h1>
              <h3 className="mt-3 mb-2">{errorText}</h3>
              <Link
                to={ROUTE_DASHBOARD}
                className="btn btn-primary text-uppercase waves-effect waves-light"
              >
                {authenticated ? 'Powrót na dashboard' : 'Powrót do logowania'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect<StateProps>(mapState)(Page);
