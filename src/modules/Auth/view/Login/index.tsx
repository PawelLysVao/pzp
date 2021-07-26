import { RootState } from 'app/reducer';
import { loginAction } from 'modules/Auth/action';
import Form from 'modules/Auth/component/Form/Login';
import { Credentials } from 'modules/Auth/type';
import Alert from 'modules/Layout/component/Alert';
import Loader from 'modules/Layout/component/Loader';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { managePageAction } from 'modules/Layout/action';
import PublicWrapper from 'modules/Layout/component/Wrapper/Public';
import AuthLogo from 'modules/Auth/component/Logo/Auth';
import { ROUTE_PASSWORD_RECOVER, ROUTE_REGISTER } from 'modules/Auth/routes';
import './style.scss';

const LoginView: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { busy, message, errors } = useSelector((state: RootState) => state.auth);

  console.log('busy: ', busy);
  useEffect(() => {
    dispatch(managePageAction({ title: 'Log in' }));
  }, []);

  const login = (credentials: Credentials) => dispatch(loginAction(credentials));

  return (
    <PublicWrapper>
      <div className="login-view">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-11 col-lg-9 col-xl-7">
              <div className="card position-relative px-md-5 py-2">
                <div className="card-body">
                  <AuthLogo width={160} text="Zaloguj się" />
                  {busy && <Loader />}
                  <div className="px-lg-4 mt-4">
                    {message && <Alert message={message} />}
                    <Form busy={busy} errors={errors} submit={login} />
                    <div className="row mt-3">
                      <div className="col-12">
                        <div className="d-flex flex-wrap justify-content-between">
                          <p>
                            <a href={ROUTE_PASSWORD_RECOVER} className="text-muted">
                              Zapomniałem hasła
                            </a>
                          </p>
                          <p>
                            <a href={ROUTE_REGISTER} className="text-muted">
                              Zarejestruj się
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicWrapper>
  );
};

export default LoginView;
