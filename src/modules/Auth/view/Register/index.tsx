// import { RootState } from 'app/reducer';
// import { RegisterAction, registerAction } from 'modules/Auth/action';
// import RegisterForm from 'modules/Auth/component/Register/Form';
// import { View } from 'modules/Auth/component/View';
// import { RegisterValues } from 'modules/Auth/type';
// import { Message, ValidationErrors } from 'modules/Shared/type';
// import React from 'react';
// import { connect } from 'react-redux';
// import { Dispatch } from 'redux';
// import { PageProps } from 'modules/Layout/type';
// import { managePageAction, ManagePageAction } from 'modules/Layout/action';
// import PublicWrapper from 'modules/Layout/component/Wrapper/Public';

// export interface StateProps {
//   busy: boolean;
//   message?: Message;
//   errors?: ValidationErrors;
// }

// export interface DispatchProps {
//   register: (values: RegisterValues) => RegisterAction;
//   managePage: (payload: PageProps) => ManagePageAction;
// }

// export type Props = StateProps & DispatchProps;

// export const mapState = (state: RootState): StateProps => {
//   const { busy, message, errors } = state.auth;

//   return { busy, message, errors };
// };

// export const mapDispatch = (dispatch: Dispatch): DispatchProps => ({
//   register: (values) => dispatch(registerAction(values)),
//   managePage: (payload: PageProps) => dispatch(managePageAction(payload))
// });

// export class Register extends React.Component<Props> {
//   componentDidMount(): void {
//     const { managePage } = this.props;

//     managePage({
//       title: 'Rejestracja'
//     });
//   }

//   render(): JSX.Element {
//     const { busy, message, errors, register } = this.props;

//     return (
//       <PublicWrapper>
//         <View
//           className="m-0"
//           busy={busy}
//           message={message}
//           logoText="Zarejestruj się"
//           logoSize={195}
//         >
//           <span />
//           <RegisterForm busy={busy} errors={errors} submit={register} />
//         </View>
//       </PublicWrapper>
//     );
//   }
// }

// export default connect<StateProps, DispatchProps>(
//   mapState,
//   mapDispatch
// )(Register);
