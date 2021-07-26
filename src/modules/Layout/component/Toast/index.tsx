import React, { ReactNode } from 'react';
import { Toast as ToastStrap, ToastBody, ToastHeader } from 'reactstrap';
import { Toast as ToastType } from 'modules/Layout/type';

export interface Props extends ToastType {
  removeToast: (id: string) => void;
}

export interface State {
  isOpen: boolean;
}

class Toast extends React.Component<Props, State> {
  autoRemoveTimeout: NodeJS.Timeout = null;
  removeTimeout: NodeJS.Timeout = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: true
    };

    this.removeToast = this.removeToast.bind(this);
    this.closeToast = this.closeToast.bind(this);
  }

  componentDidMount(): void {
    const { closeIn } = this.props;

    if (closeIn) {
      this.autoRemoveTimeout = setTimeout(() => {
        this.closeToast();
      }, closeIn);
    }
  }

  componentWillUnmount(): void {
    clearTimeout(this.removeTimeout);
    clearTimeout(this.autoRemoveTimeout);
  }

  closeToast(): void {
    this.setState(
      {
        isOpen: false
      },
      () => {
        this.removeToast();
      }
    );
  }

  removeToast(): void {
    const { id, removeToast } = this.props;

    clearTimeout(this.autoRemoveTimeout);
    clearTimeout(this.removeTimeout);

    this.removeTimeout = setTimeout(() => {
      removeToast(id);
    }, 1000);
  }

  render(): ReactNode {
    const { header, body, color = 'info' } = this.props;
    const { isOpen } = this.state;

    return (
      <ToastStrap isOpen={isOpen}>
        <ToastHeader icon={color} toggle={this.closeToast}>
          {header}
        </ToastHeader>
        <ToastBody className={`alert-${color}`}>{body}</ToastBody>
      </ToastStrap>
    );
  }
}

export default Toast;
