import { RootState } from 'app/reducer';
import { registerAction } from 'modules/Auth/action';
import RegisterForm from 'modules/Auth/component/Register/Form';
import { View } from 'modules/Auth/component/View';
import { RegisterValues } from 'modules/Auth/type';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageProps } from 'modules/Layout/type';
import { managePageAction } from 'modules/Layout/action';
import PublicWrapper from 'modules/Layout/component/Wrapper/Public';

const Register = () => {
  const dispatch = useDispatch();
  const { busy, message, errors } = useSelector((state: RootState) => state.auth);

  const register = (values: RegisterValues) => dispatch(registerAction(values) as any);
  const managePage = (payload: PageProps) => dispatch(managePageAction(payload));

  useEffect(() => {
    managePage({
      title: 'Rejestracja'
    });
  }, []);

  return (
    <PublicWrapper>
      <View className="m-0" busy={busy} message={message} logoText="Zarejestruj się" logoSize={195}>
        <span />
        <RegisterForm busy={busy} errors={errors} submit={register} />
      </View>
    </PublicWrapper>
  );
};

export default Register;
