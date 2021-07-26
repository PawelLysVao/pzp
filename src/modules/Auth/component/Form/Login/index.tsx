import { Credentials } from 'modules/Auth/type';
import { getError, hasError } from 'modules/Shared/helper/validation';
import { ValidationErrors } from 'modules/Shared/type';
import React, { ReactNode } from 'react';
import {
  Button,
  Form as FormStrap,
  FormFeedback,
  FormGroup,
  Input
} from 'reactstrap';

export type State = {
  credentials: Credentials;
};

export type Props = {
  errors: ValidationErrors;
  submit: (credentials: Credentials) => void;
  busy: boolean;
};

class Form extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      credentials: {
        email: '',
        password: ''
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof Credentials
  ): void {
    const { value } = event.currentTarget;
    const { credentials } = this.state;

    this.setState({
      credentials: { ...credentials, [key]: value }
    });
  }

  onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const { submit } = this.props;
    const { credentials } = this.state;

    submit(credentials);
  }

  render(): ReactNode {
    const { errors, busy } = this.props;
    const { credentials } = this.state;

    return (
      <FormStrap onSubmit={this.onSubmit}>
        <FormGroup className="mb-3">
          <Input
            type="email"
            name="email"
            id="email-input"
            placeholder="Email"
            value={credentials.email}
            disabled={busy}
            onChange={(event) => this.onChange(event, 'email')}
            invalid={hasError(errors, 'email')}
            required
          />
          {hasError(errors, 'email') && (
            <FormFeedback>{getError(errors, 'email')}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup className="mb-4">
          <Input
            type="password"
            name="password"
            id="password-input"
            placeholder="Password"
            value={credentials.password}
            disabled={busy}
            onChange={(event) => this.onChange(event, 'password')}
            invalid={hasError(errors, 'password')}
            required
          />
          {hasError(errors, 'password') && (
            <FormFeedback>{getError(errors, 'password')}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup className="mb-0">
          <Button
            className="waves-effect waves-light"
            type="submit"
            color="primary"
            disabled={busy}
          >
            Log in
          </Button>
        </FormGroup>
      </FormStrap>
    );
  }
}

export default Form;
