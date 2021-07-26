import React from 'react';
import { Spinner, SpinnerProps } from 'reactstrap';
import './style.scss';

const Loader: React.FC = (props: SpinnerProps): JSX.Element => {
  const { type, size, color = 'primary' } = props;
  return (
    <div className="loader">
      <Spinner type={type} size={size} color={color} />
    </div>
  );
};

export default Loader;
