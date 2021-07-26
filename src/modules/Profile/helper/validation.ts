// prettier-ignore
export const PASSWORD_INVALID = 'Hasło powinno składać się z minimum 8 znaków, jednej dużej, jednej małej litery oraz cyfry';
export const PASSWORD_MISMATCH = 'Hasła nie pasują do siebie';
export const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

export const validatePassword = (element: HTMLInputElement, password: string): void => {
  if (password.length > 0 && !PASSWORD_REGEXP.test(password)) {
    element.setCustomValidity(PASSWORD_INVALID);
  } else {
    element.setCustomValidity('');
  }
};

export const validateConfirmation = (element: HTMLInputElement, password: string, confirmation: string): void => {
  if (password.length >= 8 && password !== confirmation) {
    element.setCustomValidity(PASSWORD_MISMATCH);
  } else {
    element.setCustomValidity('');
  }
};
