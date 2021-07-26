import _get from 'lodash/get';
import { RootState } from 'app/reducer';
import ListingFilter from 'modules/Layout/component/Listing/Filter';
import {
  PartialSearchingProps,
  PaginationParams,
  SearchParams
} from 'modules/Shared/type';
import {
  SetUserListParamsAction,
  setUserListParamsAction
} from 'modules/User/action/list';
import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { FilterInputType } from 'modules/Layout/type';
import User from 'modules/User/model/User';

export interface StateProps {
  filter: SearchParams;
  pagination: PaginationParams;
}

export interface DispatchProps {
  setParams: (payload: PartialSearchingProps) => SetUserListParamsAction;
}

export interface Props extends StateProps, DispatchProps {
  values?: SearchParams;
}

export const mapState = (state: RootState): StateProps => {
  const { filter, pagination } = state.user.list;

  return { filter, pagination };
};

export const mapDispatch = (dispatch: Dispatch): DispatchProps => ({
  setParams: (payload: PartialSearchingProps) =>
    dispatch(setUserListParamsAction(payload))
});

export class UserFilter extends React.Component<Props> {
  protected staticInputs: FilterInputType[];

  constructor(props: Props) {
    super(props);

    const { values = {} } = props;

    this.staticInputs = [
      {
        type: 'text',
        property: 'email',
        label: 'Email',
        value: _get(values, 'email')
      },
      {
        type: 'text',
        property: 'username',
        label: 'Username',
        value: _get(values, 'username')
      },
      {
        type: 'text',
        property: 'country',
        label: 'Country',
        value: _get(values, 'country')
      },
      {
        type: 'number',
        property: 'age_min',
        label: 'Age min',
        value: _get(values, 'age_min')
      },
      {
        type: 'number',
        property: 'age_max',
        label: 'Age max',
        value: _get(values, 'age_max')
      },
      {
        type: 'select',
        property: 'plants_owned',
        label: 'Plants owned',
        value: _get(values, 'plants_owned'),
        options: [
          {
            value: '',
            label: ''
          },
          ...User.getPlantsOwnedOptions()
        ]
      },
      {
        type: 'select',
        property: 'plants_knowledge',
        label: 'Plants knowledge',
        value: _get(values, 'plants_knowledge'),
        options: [
          {
            value: '',
            label: ''
          },
          ...User.getPlantsKnowledgeOptions()
        ]
      }
    ];
  }

  render(): ReactNode {
    const { filter, pagination, setParams } = this.props;

    return (
      <ListingFilter
        inputs={this.staticInputs}
        filter={filter}
        pagination={pagination}
        setParams={setParams}
      />
    );
  }
}

export default connect<StateProps, DispatchProps>(
  mapState,
  mapDispatch
)(UserFilter);
