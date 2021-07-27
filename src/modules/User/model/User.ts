export type UserEntity = {
  id?: number;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  new_email?: string;
  company?: string;
  is_deletable?: boolean;
  status?: number;
  permissions?: any[];
  role?: number;
  last_login_at?: string;
  updated_at?: string;
  created_at?: string;
};

export default class User {
  readonly id?: number;
  readonly name?: string;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly email?: string;
  readonly new_email?: string;
  readonly company?: string;
  readonly is_deletable?: boolean;
  readonly status?: number;
  readonly permissions?: any[];
  readonly role?: any;
  readonly last_login_at?: string;
  readonly updated_at?: string;
  readonly created_at?: string;

  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.first_name = entity.first_name;
    this.name = entity.name;
    this.last_name = entity.last_name;
    this.email = entity.email;
    this.new_email = entity.new_email;
    this.company = entity.company;
    this.is_deletable = entity.is_deletable;
    this.status = entity.status;
    this.permissions = entity.permissions;
    this.role = entity.role;
    this.last_login_at = entity.last_login_at;
    this.updated_at = entity.updated_at;
    this.created_at = entity.created_at;
  }

  static getFilterableAttributes(): string[] {
    return ['email', 'username', 'country', 'age_min', 'age_max', 'plants_owned', 'status'];
  }

  static getSortableAttributes(): string[] {
    return ['username', 'birth_date', 'age', 'country'];
  }

  // static getPlantsOwnedOptions(): SelectOption[] {
  //   return [
  //     {
  //       value: 1,
  //       label: '1-5'
  //     },
  //     {
  //       value: 2,
  //       label: '6-10'
  //     },
  //     {
  //       value: 3,
  //       label: '11-20'
  //     },
  //     {
  //       value: 4,
  //       label: '>20'
  //     }
  //   ];
  // }

  // static getPlantsKnowledgeOptions(): SelectOption[] {
  //   return [
  //     {
  //       value: 1,
  //       label: 'I hardly know how to keep them alive.'
  //     },
  //     {
  //       value: 2,
  //       label: 'We are slowly becoming friends.'
  //     },
  //     {
  //       value: 3,
  //       label: 'Plants love me!'
  //     }
  //   ];
  // }

  // getPlantsKnowledge(): string {
  //   const option = User.getPlantsKnowledgeOptions().find((option) => option.value === this.status);

  //   if (!option) {
  //     return null;
  //   }

  //   return option.label;
  // }

  // getPlantsOwned(): string {
  //   const option = User.getPlantsOwnedOptions().find((option) => option.value === this.plants_owned);

  //   if (!option) {
  //     return null;
  //   }

  //   return option.label;
  // }
}

export const createUser = (entity: UserEntity): User => new User(entity);

/*
permissions: ["users_index", "users_add", "users_edit", "users_delete", "users_details"]
    0: "users_index"
    1: "users_add"
    2: "users_edit"
    3: "users_delete"
    4: "users_details"
role: {id: 1, slug: "admin", name: "Administrator systemu"}
    id: 1
    name: "Administrator systemu"
    slug: "admin"

*/
