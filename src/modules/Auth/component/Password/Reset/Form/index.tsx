import { ResetPasswordValues } from 'modules/Auth/type';
import { validateConfirmation, validatePassword } from 'modules/Profile/helper/validation';
import { getError, hasError } from 'modules/Shared/helper/validation';
import { ValidationErrors } from 'modules/Shared/type';
import React, { useState } from 'react';
import { Button, Form as FormStrap, FormFeedback, FormGroup, Input, Label } from 'reactstrap';

export type Props = {
  busy: boolean;
  errors?: ValidationErrors;
  submit: (values: ResetPasswordValues) => void;
};

const PasswordResetForm: React.FC<Props> = ({ busy, errors, submit }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    password_confirmation: ''
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, key: keyof ResetPasswordValues) => {
    const { target } = event;
    setValues({ ...values, [key]: target.value });

    validate(target);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(values);
    console.log(values);
  };

  const isSubmittable = () => Object.values(values).every(Boolean) && !busy;

  const validate = (element: HTMLInputElement) => {
    if (element.name === 'password') {
      validatePassword(element, values.password);
    } else if (element.name === 'password_confirmation') {
      validateConfirmation(element, values.password, values.password_confirmation);
    }
  };

  return (
    <FormStrap onSubmit={onSubmit}>
      <FormGroup className="mb-3">
        <Label for="email">Adres e-mail</Label>
        <Input
          type="email"
          name="email"
          value={values.email}
          onChange={(event) => onChange(event, 'email')}
          invalid={hasError(errors, 'email')}
          disabled={busy}
          required
        />
        {hasError(errors, 'email') && <FormFeedback>{getError(errors, 'email')}</FormFeedback>}
      </FormGroup>
      <FormGroup className="mb-3">
        <Label for="password">Nowe hasło</Label>
        <Input
          type="password"
          name="password"
          value={values.password}
          onChange={(event) => onChange(event, 'password')}
          invalid={hasError(errors, 'password')}
          disabled={busy}
          required
        />
        {hasError(errors, 'password') && <FormFeedback>{getError(errors, 'password')}</FormFeedback>}
      </FormGroup>
      <FormGroup className="mb-3">
        <Label for="password_confirmation">Potwierdź hasło</Label>
        <Input
          type="password"
          name="password_confirmation"
          placeholder={values.password_confirmation}
          value={values.password_confirmation}
          onChange={(event) => onChange(event, 'password_confirmation')}
          invalid={hasError(errors, 'password_confirmation')}
          disabled={busy}
          required
        />
        {hasError(errors, 'password_confirmation') && (
          <FormFeedback>{getError(errors, 'password_confirmation')}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup className="mb-0 text-center">
        <Button className="waves-effect waves-light" type="submit" color="primary" disabled={!isSubmittable()} block>
          Zmień hasło
        </Button>
      </FormGroup>
    </FormStrap>
  );
};

export default PasswordResetForm;
