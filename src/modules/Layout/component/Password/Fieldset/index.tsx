import { suffixValue } from 'modules/Layout/helper/misc';
import { PasswordValues } from 'modules/Layout/type';
import { validateConfirmation, validatePassword } from 'modules/Profile/helper/validation';
import { getError, hasError } from 'modules/Shared/helper/validation';
import { ValidationErrors } from 'modules/Shared/type';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

export interface Props {
  errors?: ValidationErrors;
  disabled?: boolean;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, key: keyof PasswordValues) => void;
  placeholder?: boolean;
}

export interface State {
  values: PasswordValues;
}

class PasswordFieldset extends React.Component<Props, State> {
  private readonly passwordRef: React.RefObject<HTMLInputElement>;
  private readonly confirmationRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.passwordRef = React.createRef();
    this.confirmationRef = React.createRef();

    this.state = {
      values: {
        password: '',
        password_confirmation: ''
      }
    };

    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>, key: keyof PasswordValues): void {
    const { onChange } = this.props;
    const { values } = this.state;
    const { target } = event;

    this.setState(
      {
        values: { ...values, [key]: target.value }
      },
      () => this.validate()
    );

    onChange(event, key);
  }

  validate(): void {
    const { values } = this.state;

    validatePassword(this.passwordRef.current, values.password);

    validateConfirmation(this.confirmationRef.current, values.password, values.password_confirmation);
  }

  render(): React.ReactNode {
    const { errors, disabled, required, placeholder = false } = this.props;
    const { values } = this.state;

    return (
      <fieldset className="m-0" disabled={disabled}>
        <FormGroup className="mb-3">
          {!placeholder && <Label for="input-password">{suffixValue('Nowe hasło', required)}</Label>}
          <Input
            innerRef={this.passwordRef}
            type="password"
            name="password"
            id="input-password"
            placeholder={placeholder ? suffixValue('Nowe hasło', required) : null}
            value={values.password}
            onChange={(event) => this.onChange(event, 'password')}
            invalid={hasError(errors, 'password')}
            required={required}
          />
          {hasError(errors, 'password') && <FormFeedback>{getError(errors, 'password')}</FormFeedback>}
        </FormGroup>
        <FormGroup className="mb-3">
          {!placeholder && <Label for="input-password">{suffixValue('Potwierdź hasło', required)}</Label>}
          <Input
            innerRef={this.confirmationRef}
            type="password"
            name="password_confirmation"
            id="input-password-confirmation"
            placeholder={placeholder ? suffixValue('Potwierdź hasło', required) : null}
            value={values.password_confirmation}
            onChange={(event) => this.onChange(event, 'password_confirmation')}
            invalid={hasError(errors, 'password_confirmation')}
            required={required}
          />
          {hasError(errors, 'password_confirmation') && (
            <FormFeedback>{getError(errors, 'password_confirmation')}</FormFeedback>
          )}
        </FormGroup>
      </fieldset>
    );
  }
}

export default PasswordFieldset;
