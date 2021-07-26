// import { getError, hasError } from 'modules/Shared/helper/validation';
// import { ValidationErrors } from 'modules/Shared/type';
// import { OrganizationUserForm } from 'modules/User/type';
// import React from 'react';
// import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
// import { suffixValue } from 'modules/Layout/helper/misc';

// export type Props = {
//   errors?: ValidationErrors;
//   values: OrganizationUserForm;
//   onChange: (
//     event: React.ChangeEvent<HTMLInputElement>,
//     key: keyof OrganizationUserForm
//   ) => void;
//   disabled?: boolean;
//   requiredAdminData?: boolean;
// };

// export const FieldsetOrganizationUser: React.FC<Props> = (
//   props: Props
// ): JSX.Element => {
//   const { values, errors, onChange, disabled, requiredAdminData } = props;

//   return (
//     <>
//       <FormGroup tag="fieldset" disabled={disabled}>
//         <Label for="email">Email*</Label>
//         <Input
//           type="email"
//           name="email"
//           id="email"
//           value={values.email}
//           onChange={(event) => onChange(event, 'email')}
//           required
//           maxLength={500}
//           invalid={hasError(errors, 'email')}
//         />
//         {hasError(errors, 'email') && (
//           <FormFeedback>{getError(errors, 'email')}</FormFeedback>
//         )}
//       </FormGroup>
//       <FormGroup>
//         <Label for="password">Hasło*</Label>
//         <Input
//           type="password"
//           name="password"
//           id="password"
//           value={values.password}
//           autoComplete="new-password"
//           onChange={(event) => onChange(event, 'password')}
//           required
//           maxLength={200}
//           invalid={hasError(errors, 'password')}
//         />
//         {hasError(errors, 'password') && (
//           <FormFeedback>{getError(errors, 'password')}</FormFeedback>
//         )}
//       </FormGroup>
//       <FormGroup>
//         <Label for="password_confirmation">Potwierdź hasło*</Label>
//         <Input
//           type="password"
//           name="password_confirmation"
//           id="password_confirmation"
//           value={values.password_confirmation}
//           autoComplete="new-password"
//           onChange={(event) => onChange(event, 'password_confirmation')}
//           required
//           maxLength={200}
//           invalid={hasError(errors, 'password_confirmation')}
//         />
//         {hasError(errors, 'password_confirmation') && (
//           <FormFeedback>
//             {getError(errors, 'password_confirmation')}
//           </FormFeedback>
//         )}
//       </FormGroup>
//       <FormGroup>
//         <Label for="first_name">{suffixValue('Imię', requiredAdminData)}</Label>
//         <Input
//           type="text"
//           name="first_name"
//           id="first_name"
//           value={values.first_name}
//           onChange={(event) => onChange(event, 'first_name')}
//           maxLength={200}
//           required={requiredAdminData}
//           invalid={hasError(errors, 'first_name')}
//         />
//         {hasError(errors, 'first_name') && (
//           <FormFeedback>{getError(errors, 'first_name')}</FormFeedback>
//         )}
//       </FormGroup>
//       <FormGroup>
//         <Label for="last_name">
//           {suffixValue('Nazwisko', requiredAdminData)}
//         </Label>
//         <Input
//           type="text"
//           name="last_name"
//           id="last_name"
//           value={values.last_name}
//           onChange={(event) => onChange(event, 'last_name')}
//           maxLength={200}
//           required={requiredAdminData}
//           invalid={hasError(errors, 'last_name')}
//         />
//         {hasError(errors, 'last_name') && (
//           <FormFeedback>{getError(errors, 'last_name')}</FormFeedback>
//         )}
//       </FormGroup>
//     </>
//   );
// };

// export default FieldsetOrganizationUser;
