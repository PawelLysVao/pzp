import React from 'react';
import { RootState } from 'app/reducer';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import './style.scss';

export interface StateProps {
  showLoader: boolean;
}

export type Props = StateProps;

export const mapState = (rootState: RootState): StateProps => {
  const { authenticating } = rootState.auth;
  const { showLoader } = rootState.layout;

  return { showLoader: showLoader || authenticating };
};

const Loader: React.FC<Props> = (props: Props): JSX.Element => {
  const { showLoader } = props;

  if (showLoader) {
    return (
      <div className="loader layout-loader">
        <Spinner color="primary" />
      </div>
    );
  }

  return null;
};

export default connect<StateProps>(mapState)(Loader);
