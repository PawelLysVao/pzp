import { SelectOption } from 'modules/Shared/type';

export type UserEntity = {
  id?: number;
  email?: string;
  username?: string;
  age?: number;
  birth_date?: string;
  city?: string;
  country?: string;
  lang?: string;
  plants_knowledge?: number;
  plants_owned?: number;
  status?: number;
};

export default class User {
  readonly id?: number;
  readonly email?: string;
  readonly username?: string;
  readonly age?: number;
  readonly birth_date?: string;
  readonly city?: string;
  readonly country?: string;
  readonly lang?: string;
  readonly plants_knowledge?: number;
  readonly plants_owned?: number;
  readonly status?: number;

  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.email = entity.email;
    this.username = entity.username;
    this.age = entity.age;
    this.birth_date = entity.birth_date;
    this.city = entity.city;
    this.country = entity.country;
    this.lang = entity.lang;
    this.plants_knowledge = entity.plants_knowledge;
    this.plants_owned = entity.plants_owned;
    this.status = entity.status;
  }

  static getFilterableAttributes(): string[] {
    return [
      'email',
      'username',
      'country',
      'age_min',
      'age_max',
      'plants_owned',
      'plants_knowledge'
    ];
  }

  static getSortableAttributes(): string[] {
    return ['username', 'birth_date', 'age', 'country'];
  }

  static getPlantsOwnedOptions(): SelectOption[] {
    return [
      {
        value: 1,
        label: '1-5'
      },
      {
        value: 2,
        label: '6-10'
      },
      {
        value: 3,
        label: '11-20'
      },
      {
        value: 4,
        label: '>20'
      }
    ];
  }

  static getPlantsKnowledgeOptions(): SelectOption[] {
    return [
      {
        value: 1,
        label: 'I hardly know how to keep them alive.'
      },
      {
        value: 2,
        label: 'We are slowly becoming friends.'
      },
      {
        value: 3,
        label: 'Plants love me!'
      }
    ];
  }

  getPlantsKnowledge(): string {
    const option = User.getPlantsKnowledgeOptions().find(
      (option) => option.value === this.plants_knowledge
    );

    if (!option) {
      return null;
    }

    return option.label;
  }

  getPlantsOwned(): string {
    const option = User.getPlantsOwnedOptions().find(
      (option) => option.value === this.plants_owned
    );

    if (!option) {
      return null;
    }

    return option.label;
  }
}

export const createUser = (entity: UserEntity): User => new User(entity);
