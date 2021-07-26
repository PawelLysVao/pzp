import { getError, hasError } from 'modules/Shared/helper/validation';
import { ValidationErrors } from 'modules/Shared/type';
import React, { useState } from 'react';
import { Button, Form as FormStrap, FormFeedback, FormGroup, Input, Label } from 'reactstrap';

export type Props = {
  busy: boolean;
  errors?: ValidationErrors;
  submit: (email: string) => void;
};

const PasswordRecoverForm: React.FC<Props> = ({ busy, errors, submit }) => {
  const [email, setEmail] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(email);
  };

  return (
    <FormStrap onSubmit={onSubmit}>
      <FormGroup className="mb-3">
        <Label for="email">Adres e-mail</Label>
        <Input
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          invalid={hasError(errors, 'email')}
          disabled={busy}
          required
        />
        {hasError(errors, 'email') && <FormFeedback>{getError(errors, 'email')}</FormFeedback>}
      </FormGroup>
      <FormGroup className="mb-0 text-center">
        <Button className="waves-effect waves-light" type="submit" color="primary" disabled={!email || busy} block>
          Wyślij
        </Button>
      </FormGroup>
    </FormStrap>
  );
};

export default PasswordRecoverForm;
