import { Message } from 'modules/Shared/type';
import React from 'react';
import { Alert as AlertStrap, AlertProps as AlertStrapProps } from 'reactstrap';

export interface Props extends AlertStrapProps {
  message: Message;
}

const Alert: React.FC<Props> = (props: Props): JSX.Element => {
  const { message, ...alertProps } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AlertStrap color={message.variant} {...alertProps}>
      {message.value}
    </AlertStrap>
  );
};

export default Alert;
