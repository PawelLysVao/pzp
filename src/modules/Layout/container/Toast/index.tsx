import React from 'react';
import { Toast as ToastType } from 'modules/Layout/type';
import ToastComponent from 'modules/Layout/component/Toast';
import { RootState } from 'app/reducer';
import { connect } from 'react-redux';
import './style.scss';
import { Dispatch } from 'redux';
import { RemoveToastAction, removeToastAction } from 'modules/Layout/action';

export interface DispatchProps {
  removeToast: (id: string) => RemoveToastAction;
}

export interface StateProps {
  toasts: ToastType[];
}

export type Props = StateProps & DispatchProps;

export const mapState = (state: RootState): StateProps => {
  const { toasts } = state.layout;

  return { toasts };
};

export const mapDispatch = (dispatch: Dispatch): DispatchProps => ({
  removeToast: (id) => dispatch(removeToastAction(id))
});

const Toast: React.FC<Props> = (props: Props): JSX.Element => {
  const { toasts, removeToast } = props;

  return (
    <div className="toasts-wrapper">
      {toasts.map((toast) => (
        <ToastComponent
          key={toast.id}
          id={toast.id}
          header={toast.header}
          body={toast.body}
          color={toast.color}
          closeIn={toast.closeIn}
          removeToast={removeToast}
        />
      ))}
    </div>
  );
};

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(Toast);
