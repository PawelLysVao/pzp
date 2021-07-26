import { RootState } from 'app/reducer';
import Loader from 'modules/Layout/component/Loader';
import Page403 from 'modules/Layout/component/Page/403';
import Page404 from 'modules/Layout/component/Page/404';
import Page500 from 'modules/Layout/component/Page/500';
import Breadcrumb from 'modules/Layout/container/Page/Breadcrumb';
import { BreadcrumbItem, PageProps } from 'modules/Layout/type';
import React, { ReactNode } from 'react';
import { connect } from 'react-redux';

export type StateProps = PageProps;

export interface Props extends StateProps, Readonly<{ children?: ReactNode }> {
  defaultBreadcrumbItem?: BreadcrumbItem;
}

export const mapState = (state: RootState): StateProps => {
  const { title, type, breadcrumb } = state.layout.page;

  return { title, type, breadcrumb };
};

export class Page extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.renderType = this.renderType.bind(this);
  }

  renderType(): ReactNode {
    const { type } = this.props;

    switch (type) {
      case 'loading':
        return <Loader />;
      case '403':
        return <Page403 />;
      case '404':
        return <Page404 />;
      case '500':
        return <Page500 />;
      default:
        return null;
    }
  }

  render(): ReactNode {
    const { title, breadcrumb, defaultBreadcrumbItem, children } = this.props;

    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex flex-wrap flex-wrap align-items-center justify-content-between">
                  <h4 className="page-title text-primary mr-md-3">{title}</h4>
                  <Breadcrumb
                    defaultItem={defaultBreadcrumbItem}
                    items={breadcrumb}
                  />
                </div>
              </div>
            </div>
            {children}
            {this.renderType()}
          </div>
        </div>
      </div>
    );
  }
}

export default connect<StateProps>(mapState)(Page);
