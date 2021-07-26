import moment from 'moment';

export type ModulePermissionKey = 'read' | 'write';

export const MODULE_EXECUTOR = 'md_executor';
export const MODULE_POC = 'md_poc';
export const MODULE_ADM = 'md_adm';
export const MODULE_OT = 'md_ot';
export const MODULE_ORDER_PLAN = 'md_order_plan';
export const MODULE_OTHER_ENTITIES = 'md_other_entities';

export const CREATE_ORDER_MODULES = [MODULE_OT, MODULE_POC];

export interface ModulePermission {
  id: number;
  read: boolean;
  write: boolean;
}

export interface ModuleAccess {
  id: number;
  full_access?: boolean;
}

export type ModuleAvailabilityKey = 'active' | 'infinite';

export interface ModuleAvailability {
  id: number;
  active: boolean;
  infinite: boolean;
}

export interface ModuleExpiration {
  id: number;
  expires_at?: string;
}

export interface ModuleEntity extends ModuleAccess, ModuleExpiration {
  id: number;
  name?: string;
  slug?: string;
  description?: string;
  indefinite?: number;
  assignable?: boolean;
  created_at?: string;
  updated_at?: string;
}

export default class Module {
  readonly id: number;
  readonly name?: string;
  readonly slug?: string;
  readonly description?: string;
  readonly indefinite?: number;
  readonly assignable?: boolean;
  readonly full_access?: boolean;
  readonly expires_at?: string;
  readonly created_at?: string;
  readonly updated_at?: string;

  constructor(entity: ModuleEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.slug = entity.slug;
    this.description = entity.description;
    this.indefinite = entity.indefinite;
    this.assignable = entity.assignable;
    this.full_access = entity.full_access;
    this.expires_at = entity.expires_at;
    this.created_at = entity.created_at;
    this.updated_at = entity.updated_at;
  }

  getEntity(): ModuleEntity {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      description: this.description,
      indefinite: this.indefinite,
      full_access: this.full_access,
      expires_at: this.expires_at,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }

  getPermission(): ModulePermission {
    const permissions: ModulePermission = {
      id: this.id,
      read: false,
      write: false
    };

    if (typeof this.full_access === 'boolean') {
      permissions.read = true;
      permissions.write = this.full_access;
    }

    return permissions;
  }

  getAccess(): ModuleAccess {
    return {
      id: this.id,
      full_access: this.full_access
    };
  }

  getAccessLabel(): string {
    if (typeof this.full_access === 'boolean') {
      return this.full_access ? 'zapis oraz odczyt' : 'tylko odczyt';
    }

    return 'brak uprawnień';
  }

  doesExpire(): boolean {
    return typeof this.expires_at === 'string';
  }

  isActive(): boolean {
    if (this.doesExpire()) {
      return moment().isBefore(this.expires_at);
    }

    return true;
  }

  getAvailability(): ModuleAvailability {
    const availability: ModuleAvailability = {
      id: this.id,
      active: true,
      infinite: true
    };

    if (this.doesExpire()) {
      availability.infinite = false;
    }

    return availability;
  }

  getDuration(): ModuleExpiration {
    return {
      id: this.id,
      expires_at: this.expires_at
    };
  }

  static toPermission(access: ModuleAccess): ModulePermission {
    const { id, full_access } = access;

    return { id, read: true, write: full_access };
  }

  static toAccess(permission: ModulePermission): ModuleAccess {
    const { id, read, write } = permission;

    return { id, full_access: read && write };
  }
}

export const createModule = (entity: ModuleEntity): Module =>
  new Module(entity);
