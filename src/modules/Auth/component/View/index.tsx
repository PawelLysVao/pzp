import { ROUTE_LOGIN } from 'modules/Auth/routes';
import Alert from 'modules/Layout/component/Alert';
import Loader from 'modules/Layout/component/Loader';
import { Message } from 'modules/Shared/type';
import React, { ReactNode } from 'react';
import AuthLogo from 'modules/Auth/component/Logo/Auth';
import './style.scss';

export interface Props {
  busy: boolean;
  message?: Message;
  children: Array<Readonly<ReactNode>>;
  className?: string;
  logoText?: string;
  logoSize?: number;
  logoType?: 'orange' | 'green';
  withoutLinks?: boolean;
}

export const View: React.FC<Props> = (props: Props): JSX.Element => {
  const {
    busy,
    message,
    children,
    logoSize = 160,
    logoText = '',
    logoType = 'orange',
    className = 'mt-5 mb-5',
    withoutLinks = false
  } = props;

  return (
    <div className={className}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-11 col-lg-9 col-xl-7">
            <div className="view-card card position-relative px-md-4 py-2">
              <div className="card-body">
                <AuthLogo width={logoSize} text={logoText} type={logoType} />
                <div className="px-lg-3 mt-4">
                  <p className="text-muted mb-4 mt-3">{children[0]}</p>
                  {message && <Alert message={message} />}
                  {children[1]}
                </div>
                {busy && <Loader />}
                {!withoutLinks && (
                  <div className="row mt-3">
                    <div className="col-12 text-center">
                      <p className="text-muted">
                        Wróć do
                        <a
                          href={ROUTE_LOGIN}
                          className="text-primary font-weight-medium ml-1"
                        >
                          logowania
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
