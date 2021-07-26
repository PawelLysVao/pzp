import { getError, hasError } from 'modules/Shared/helper/validation';
import { ValidationErrors } from 'modules/Shared/type';
import { UserIdentityValues } from 'modules/User/type';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

export interface Props {
  values: UserIdentityValues;
  errors?: ValidationErrors;
  disabled?: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof UserIdentityValues
  ) => void;
  placeholder?: boolean;
}

const UserFieldset: React.FC<Props> = (props: Props): JSX.Element => {
  const { values, errors, disabled, onChange, placeholder = false } = props;

  const { first_name = '', last_name = '', email = '' } = values;

  return (
    <fieldset className="m-0" disabled={disabled}>
      <FormGroup>
        {!placeholder && <Label for="input-first-name">Imię</Label>}
        <Input
          type="text"
          name="first_name"
          id="input-first-name"
          placeholder={placeholder ? 'Imię' : null}
          value={first_name}
          onChange={(event) => onChange(event, 'first_name')}
          invalid={hasError(errors, 'first_name')}
          maxLength={200}
        />
        {hasError(errors, 'first_name') && (
          <FormFeedback>{getError(errors, 'first_name')}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        {!placeholder && <Label for="input-last-name">Nazwisko</Label>}
        <Input
          type="text"
          name="last_name"
          id="input-last-name"
          placeholder={placeholder ? 'Nazwisko' : null}
          value={last_name}
          onChange={(event) => onChange(event, 'last_name')}
          invalid={hasError(errors, 'last_name')}
          maxLength={200}
        />
        {hasError(errors, 'last_name') && (
          <FormFeedback>{getError(errors, 'last_name')}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        {!placeholder && <Label for="input-email">Adres email*</Label>}
        <Input
          type="email"
          name="email"
          id="input-email"
          placeholder={placeholder ? 'Adres email*' : null}
          value={email}
          onChange={(event) => onChange(event, 'email')}
          invalid={hasError(errors, 'email')}
          required
        />
        {hasError(errors, 'email') && (
          <FormFeedback>{getError(errors, 'email')}</FormFeedback>
        )}
      </FormGroup>
    </fieldset>
  );
};

export default UserFieldset;
