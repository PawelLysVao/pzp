// import { RootState } from 'app/reducer';
// import {
//   recoverPasswordAction,
//   RecoverPasswordAction
// } from 'modules/Auth/action';
// import PasswordRecoverForm from 'modules/Auth/component/Password/Recover/Form';
// import { View } from 'modules/Auth/component/View';
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
//   recover: (email: string) => RecoverPasswordAction;
//   managePage: (payload: PageProps) => ManagePageAction;
// }

// export type Props = StateProps & DispatchProps;

// export const mapState = (state: RootState): StateProps => {
//   const { busy, errors, message } = state.auth;

//   return { busy, errors, message };
// };

// export const mapDispatch = (dispatch: Dispatch): DispatchProps => ({
//   recover: (email) => dispatch(recoverPasswordAction({ email })),
//   managePage: (payload: PageProps) => dispatch(managePageAction(payload))
// });

// export class PasswordRecover extends React.Component<Props> {
//   componentDidMount(): void {
//     const { managePage } = this.props;

//     managePage({
//       title: 'Reset hasła'
//     });
//   }

//   render(): JSX.Element {
//     const { busy, errors, message, recover } = this.props;

//     return (
//       <PublicWrapper>
//         <View
//           className="m-0"
//           busy={busy}
//           message={message}
//           logoText="Przypomnij hasło"
//           logoSize={232}
//         >
//           <span>
//             Wpisz swój adres e-mail, a wyślemy Ci e-mail z instrukcjami, jak
//             zresetować hasło.
//           </span>
//           <PasswordRecoverForm busy={busy} errors={errors} submit={recover} />
//         </View>
//       </PublicWrapper>
//     );
//   }
// }

// export default connect<StateProps, DispatchProps>(
//   mapState,
//   mapDispatch
// )(PasswordRecover);
