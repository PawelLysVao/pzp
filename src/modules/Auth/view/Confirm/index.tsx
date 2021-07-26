// import React, { ReactNode } from 'react';
// import { View } from 'modules/Auth/component/View';
// import {
//   confirmEmailChangeAction,
//   ConfirmEmailChangeAction
// } from 'modules/Auth/action';
// import { RootState } from 'app/reducer';
// import { Dispatch } from 'redux';
// import { connect } from 'react-redux';
// import { RouteComponentProps } from 'react-router-dom';
// import { PageProps } from 'modules/Layout/type';
// import { managePageAction, ManagePageAction } from 'modules/Layout/action';
// import PublicWrapper from 'modules/Layout/component/Wrapper/Public';

// export interface StateProps {
//   busy: boolean;
// }

// export interface DispatchProps {
//   confirmEmailChange: (token: string) => ConfirmEmailChangeAction;
//   managePage: (payload: PageProps) => ManagePageAction;
// }

// export interface PathParams {
//   token: string;
// }

// export type Props = StateProps &
//   DispatchProps &
//   RouteComponentProps<PathParams>;

// export const mapState = (rootState: RootState): StateProps => {
//   const { busy } = rootState.auth;
//   return { busy };
// };

// export const mapDispatch = (dispatch: Dispatch): DispatchProps => ({
//   confirmEmailChange: (token: string) =>
//     dispatch(confirmEmailChangeAction({ token })),
//   managePage: (payload: PageProps) => dispatch(managePageAction(payload))
// });

// export class EmailChangeConfirm extends React.Component<Props> {
//   componentDidMount(): void {
//     const {
//       confirmEmailChange,
//       match: {
//         params: { token }
//       },
//       managePage
//     } = this.props;

//     confirmEmailChange(token);
//     managePage({
//       title: 'Potwierdzenie zmiany adresu e-mail'
//     });
//   }

//   render(): ReactNode {
//     const { busy } = this.props;

//     return (
//       <PublicWrapper>
//         <View
//           className="m-0"
//           busy={busy}
//           logoText="Potwierdzenie zmiany adresu e-mail"
//           logoSize={445}
//         >
//           <span>Potwierdzenie zmiany adresu e-mail</span>
//           {busy && <span>Potwierdzanie adresu e-mail...</span>}
//         </View>
//       </PublicWrapper>
//     );
//   }
// }

// export default connect<StateProps, DispatchProps>(
//   mapState,
//   mapDispatch
// )(EmailChangeConfirm);
