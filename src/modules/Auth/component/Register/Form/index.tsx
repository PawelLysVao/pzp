import { RegisterValues } from 'modules/Auth/type';
import PasswordFieldset from 'modules/Layout/component/Password/Fieldset';
import { ValidationErrors } from 'modules/Shared/type';
import UserFieldset from 'modules/User/component/Fieldset';
import { UserFormValues } from 'modules/User/type';
import React, { useEffect, useRef, useState } from 'react';
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3';
import { Button, Form as FormStrap, FormGroup } from 'reactstrap';
// import FieldsetRegulation from 'modules/Regulation/component/Fieldset/Regulation';
// import FieldsetRodo from 'modules/Regulation/component/Fieldset/Rodo';

export interface Props {
  busy: boolean;
  errors?: ValidationErrors;
  submit: (values: RegisterValues) => void;
}

const RegisterForm: React.FC<Props> = ({ busy, errors, submit }) => {
  const captchaRef = useRef<ReCaptcha>();
  const captchaEnable = process.env.RECAPTCHA_ENABLE === 'true';
  const captchaSiteKey = process.env.RECAPTCHA_V3_SITE_KEY;

  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    regulations_accepted: false,
    rodo1_accepted: false,
    rodo2_accepted: false,
    rodo3_accepted: false,
    rodo4_accepted: false,
    'g-recaptcha-response': ''
  });

  useEffect(() => {
    if (captchaEnable) {
      loadReCaptcha(captchaSiteKey);
    }
  }, []);

  const prevErrors = useRef<ValidationErrors>();
  useEffect(() => {
    prevErrors.current = errors;
  });
  if (captchaEnable) {
    if (!prevErrors?.current && errors) {
      captchaRef?.current?.execute();
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(values);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, key: keyof UserFormValues) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setValues({ ...values, [key]: value });
  };

  const onCaptchaChange = (token: string | null) => setValues({ ...values, 'g-recaptcha-response': token });

  return (
    <FormStrap onSubmit={onSubmit}>
      <UserFieldset values={values} errors={errors} disabled={busy} onChange={onChange} placeholder />
      <PasswordFieldset errors={errors} disabled={busy} onChange={onChange} required placeholder />
      {/* <FieldsetRegulation errors={errors} values={values} onChange={onChange} />
      <FieldsetRodo errors={errors} values={values} onChangeField={onChange} /> */}
      {captchaEnable && (
        <ReCaptcha ref={captchaRef} sitekey={captchaSiteKey} action="submit" verifyCallback={onCaptchaChange} />
      )}
      <FormGroup className="mb-0">
        <Button type="submit" color="primary" disabled={busy} className="waves-effect waves-light mt-1">
          ZAREJESTRUJ
        </Button>
      </FormGroup>
    </FormStrap>
  );
};

/*
export interface State {
  values: RegisterValues;
}

class RegisterForm extends React.Component<Props, State> {
  private readonly captchaRef: React.RefObject<ReCaptcha>;
  private readonly captchaEnable: boolean;
  private readonly captchaSiteKey: string;

  constructor(props: Props) {
    super(props);

    this.captchaRef = React.createRef<ReCaptcha>();
    this.captchaEnable = process.env.RECAPTCHA_ENABLE === 'true';
    this.captchaSiteKey = process.env.RECAPTCHA_V3_SITE_KEY;

    this.state = {
      values: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        regulations_accepted: false,
        rodo1_accepted: false,
        rodo2_accepted: false,
        rodo3_accepted: false,
        rodo4_accepted: false,
        'g-recaptcha-response': ''
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCaptchaChange = this.onCaptchaChange.bind(this);
  }

  componentDidMount(): void {
    if (this.captchaEnable) {
      loadReCaptcha(this.captchaSiteKey);
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (this.captchaEnable) {
      // eslint-disable-next-line react/destructuring-assignment
      if (prevProps.errors === null && this.props.errors) {
        this.captchaRef.current.execute();
      }
    }
  }

  onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const { submit } = this.props;
    const { values } = this.state;

    submit(values);
  }

  onChange(
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof UserFormValues
  ): void {
    const { values } = this.state;
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ values: { ...values, [key]: value } });
  }

  onCaptchaChange(token: string | null): void {
    const { values } = this.state;

    this.setState({ values: { ...values, 'g-recaptcha-response': token } });
  }

  render(): React.ReactNode {
    const { busy, errors } = this.props;
    const { values } = this.state;

    return (
      <FormStrap onSubmit={this.onSubmit}>
        <UserFieldset
          values={values}
          errors={errors}
          disabled={busy}
          onChange={this.onChange}
          placeholder
        />
        <PasswordFieldset
          errors={errors}
          disabled={busy}
          onChange={this.onChange}
          required
          placeholder
        />
        <FieldsetRegulation
          errors={errors}
          values={values}
          onChange={this.onChange}
        />
        <FieldsetRodo
          errors={errors}
          values={values}
          onChangeField={this.onChange}
        />
        {this.captchaEnable && (
          <ReCaptcha
            ref={this.captchaRef}
            sitekey={this.captchaSiteKey}
            action="submit"
            verifyCallback={this.onCaptchaChange}
          />
        )}
        <FormGroup className="mb-0">
          <Button
            type="submit"
            color="primary"
            disabled={busy}
            className="waves-effect waves-light mt-1"
          >
            ZAREJESTRUJ
          </Button>
        </FormGroup>
      </FormStrap>
    );
  }
}

*/
export default RegisterForm;
