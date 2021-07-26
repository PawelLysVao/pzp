import { PasswordValues } from 'modules/Layout/type';
import { ModuleAccess } from 'modules/Module/model/Module';

export interface UserIdentityValues {
  first_name?: string;
  last_name?: string;
  email: string;
}

export type UserBasicFormValues = UserIdentityValues & PasswordValues;

export interface UserAccessFormValues {
  modules?: ModuleAccess[];
}

export interface UserRoleFormValues {
  role_id: number;
}

export interface UserFormValues extends UserIdentityValues, PasswordValues {
  role_id: number;
  modules?: ModuleAccess[];
  confirm_admin_change?: boolean;
  new_admin_id?: number;
  regulations_accepted?: boolean;
  rodo1_accepted?: boolean;
  rodo2_accepted?: boolean;
  rodo3_accepted?: boolean;
  rodo4_accepted?: boolean;
}

export interface DeleteUserValues {
  new_admin_id?: number;
}

export interface Author {
  id: number;
  name: string;
  role: {
    id: number;
    name: string;
  };
}
