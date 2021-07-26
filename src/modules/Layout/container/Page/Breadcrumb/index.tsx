import classNames from 'classnames';
import Authorize from 'modules/Auth/container/Authorize';
import { ROUTE_DASHBOARD } from 'modules/Layout/routes';
import { BreadcrumbItem } from 'modules/Layout/type';
import React from 'react';
import { Link } from 'react-router-dom';

export type Props = {
  items: BreadcrumbItem[];
  defaultItem?: BreadcrumbItem;
};

const Breadcrumb: React.FC<Props> = ({
  items,
  defaultItem = {
    title: 'Home',
    link: ROUTE_DASHBOARD
  }
}: Props): JSX.Element => {
  const elements = items.map(
    ({ title, link }, index) => {
      const isActive = items.length === index + 1;

      const classes = classNames('breadcrumb-item', { active: isActive });

      return (
        <Authorize
          key={title}
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {link ? (
            isActive ? (
              <li className={classes}>{title}</li>
            ) : (
              <li className={classes}>
                <Link to={link}>{title}</Link>
              </li>
            )
          ) : (
            <li className={classes}>{title}</li>
          )}
        </Authorize>
      );
    }
  );

  return (
    <ol className="breadcrumb my-1 py-2">
      <li
        className={classNames('breadcrumb-item', {
          active: items.length === 0
        })}
      >
        <Link to={defaultItem.link}>{defaultItem.title}</Link>
      </li>
      {elements}
    </ol>
  );
};

export default Breadcrumb;
