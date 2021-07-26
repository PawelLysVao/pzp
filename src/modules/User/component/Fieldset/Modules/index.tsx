import _uniqBy from 'lodash/uniqBy';
import Module, {
  ModuleAccess,
  ModulePermission,
  ModulePermissionKey
} from 'modules/Module/model/Module';
import { getError, hasError } from 'modules/Shared/helper/validation';
import { ValidationErrors } from 'modules/Shared/type';
import React from 'react';
import { CustomInput, FormFeedback, Label } from 'reactstrap';
import './index.scss';

export interface Props {
  label?: string;
  modules: Module[];
  accesses?: ModuleAccess[];
  errors?: ValidationErrors;
  disabled?: boolean;
  onChange: (accesses: ModuleAccess[]) => void;
}

class ModulesFieldset extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.getAccesses = this.getAccesses.bind(this);
    this.getPermission = this.getPermission.bind(this);
    this.isErrorArray = this.isErrorArray.bind(this);
    this.renderModule = this.renderModule.bind(this);
  }

  onChange(
    value: ModulePermission,
    key: ModulePermissionKey,
    checked: boolean
  ): void {
    const { onChange } = this.props;

    const permission = { ...value, [key]: checked };

    if (key === 'read' && !checked) {
      permission.write = false;
    }

    if (key === 'write' && checked) {
      permission.read = true;
    }

    onChange(this.getAccesses(permission));
  }

  getAccesses(permission: ModulePermission): ModuleAccess[] {
    const { accesses = [] } = this.props;

    const { write, read } = permission;

    if (write || read) {
      const concat = [Module.toAccess(permission), ...accesses];

      return _uniqBy<ModuleAccess>(concat, 'id');
    }

    return accesses.filter((access) => access.id !== permission.id);
  }

  getPermission(module: Module): ModulePermission {
    const { accesses = [] } = this.props;

    const access = accesses.find((value) => value.id === module.id);

    return access ? Module.toPermission(access) : module.getPermission();
  }

  isErrorArray(): boolean {
    const { errors } = this.props;

    return hasError(errors, 'modules') && Array.isArray(errors.modules);
  }

  renderModule(module: Module, index: number): React.ReactNode {
    const { errors } = this.props;
    const permission = this.getPermission(module);

    return (
      <div className="module-item-wrapper mb-1" key={module.id}>
        <div className="d-flex flex-row justify-content-between">
          <div className="name-col">{module.name}</div>
          <div className="read-col d-flex justify-content-center ml-auto mr-sm-4">
            <CustomInput
              type="checkbox"
              id={`module-read-${module.id}`}
              checked={permission.read}
              onChange={(event) =>
                this.onChange(permission, 'read', event.target.checked)
              }
              invalid={hasError(errors, `modules.${index}.full_access`)}
            />
          </div>
          <div className="write-col d-flex justify-content-center">
            <CustomInput
              type="checkbox"
              id={`module-write-${module.id}`}
              checked={permission.write}
              onChange={(event) =>
                this.onChange(permission, 'write', event.target.checked)
              }
              disabled={!module.isActive()}
              invalid={hasError(errors, `modules.${index}.full_access`)}
            />
          </div>
        </div>
        {(hasError(errors, `modules.${index}.full_access`) ||
          hasError(errors, `modules.${index}.id`)) && (
          <FormFeedback className="d-block">
            {getError(errors, `modules.${index}.id`)}
            {getError(errors, `modules.${index}.full_access`)}
          </FormFeedback>
        )}
      </div>
    );
  }

  render(): React.ReactNode {
    const { label = 'Moduły', modules, errors, disabled } = this.props;

    return (
      <fieldset
        className="modules-fieldset d-flex flex-column mb-3"
        disabled={disabled}
      >
        {label && <Label>{label}</Label>}
        {this.isErrorArray() && (
          <FormFeedback className="d-block mt-0 mb-2">
            {getError(errors, 'modules')}
          </FormFeedback>
        )}
        <div className="d-flex flex-row justify-content-between">
          <Label className="name-label">Nazwa</Label>
          <Label className="read-label ml-auto mr-sm-4">Odczyt</Label>
          <Label className="write-label">Zapis</Label>
        </div>
        {modules.map(this.renderModule)}
        {modules.length === 0 && (
          <div className="text-center">Brak modułów</div>
        )}
      </fieldset>
    );
  }
}

export default ModulesFieldset;
