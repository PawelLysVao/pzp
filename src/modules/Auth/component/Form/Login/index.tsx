import { Credentials } from 'modules/Auth/type';
import { getError, hasError } from 'modules/Shared/helper/validation';
import { ValidationErrors } from 'modules/Shared/type';
import React, { useState } from 'react';
import { Button, Form as FormStrap, FormFeedback, FormGroup, Input } from 'reactstrap';

export type Props = {
  errors: ValidationErrors;
  submit: (credentials: Credentials) => void;
  busy: boolean;
};

const Form: React.FC<Props> = ({ errors, submit, busy }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, key: keyof Credentials) => {
    const { value } = event.currentTarget;
    setCredentials({ ...credentials, [key]: value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(credentials);
  };

  return (
    <FormStrap onSubmit={onSubmit}>
      <FormGroup className="mb-3">
        <Input
          type="text"
          name="username"
          id="username-input"
          placeholder="Login"
          value={credentials.username}
          disabled={busy}
          onChange={(event) => onChange(event, 'username')}
          invalid={hasError(errors, 'username')}
          required
        />
        {hasError(errors, 'username') && <FormFeedback>{getError(errors, 'username')}</FormFeedback>}
      </FormGroup>
      <FormGroup className="mb-4">
        <Input
          type="password"
          name="password"
          id="password-input"
          placeholder="Hasło"
          value={credentials.password}
          disabled={busy}
          onChange={(event) => onChange(event, 'password')}
          invalid={hasError(errors, 'password')}
          required
        />
        {hasError(errors, 'password') && <FormFeedback>{getError(errors, 'password')}</FormFeedback>}
      </FormGroup>
      <FormGroup className="mb-0">
        <Button className="waves-effect waves-light" type="submit" color="primary" disabled={busy}>
          ZALOGUJ
        </Button>
      </FormGroup>
    </FormStrap>
  );
};

export default Form;
