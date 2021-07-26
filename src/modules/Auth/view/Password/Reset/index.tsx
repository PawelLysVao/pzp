// import { RootState } from 'app/reducer';
// import { resetPasswordAction, ResetPasswordAction } from 'modules/Auth/action';
// import PasswordResetForm from 'modules/Auth/component/Password/Reset/Form';
// import { View } from 'modules/Auth/component/View';
// import { ResetPasswordValues } from 'modules/Auth/type';
// import { Message, ValidationErrors } from 'modules/Shared/type';
// import React from 'react';
// import { connect } from 'react-redux';
// import { Dispatch } from 'redux';
// import { PageProps } from 'modules/Layout/type';
// import { managePageAction, ManagePageAction } from 'modules/Layout/action';
// import PublicWrapper from 'modules/Layout/component/Wrapper/Public';

// export interface StateProps {
//   busy: boolean;
//   errors?: ValidationErrors;
//   message?: Message;
// }

// export interface DispatchProps {
//   reset: (values: ResetPasswordValues) => ResetPasswordAction;
//   managePage: (payload: PageProps) => ManagePageAction;
// }

// export interface OwnProps {
//   params: { token: string };
// }

// export type Props = StateProps & DispatchProps & OwnProps;

// export const mapState = (state: RootState): StateProps => {
//   const { busy, errors, message } = state.auth;

//   return { busy, errors, message };
// };

// export const mapDispatch = (
//   dispatch: Dispatch,
//   { params }: OwnProps
// ): DispatchProps => ({
//   reset: (values) => {
//     const { token } = params;

//     return dispatch(resetPasswordAction({ ...values, token }));
//   },
//   managePage: (payload: PageProps) => dispatch(managePageAction(payload))
// });

// export class PasswordReset extends React.Component<Props> {
//   componentDidMount(): void {
//     const { managePage } = this.props;

//     managePage({
//       title: 'Reset hasła'
//     });
//   }

//   render(): JSX.Element {
//     const { busy, errors, message, reset } = this.props;

//     return (
//       <PublicWrapper>
//         <View
//           className="m-0"
//           busy={busy}
//           message={message}
//           logoText="Reset hasła"
//           logoSize={162}
//         >
//           <span>Wpisz swój adres e-mail oraz nowe hasło.</span>
//           <PasswordResetForm busy={busy} errors={errors} submit={reset} />
//         </View>
//       </PublicWrapper>
//     );
//   }
// }

// export default connect<StateProps, DispatchProps>(
//   mapState,
//   mapDispatch
// )(PasswordReset);
