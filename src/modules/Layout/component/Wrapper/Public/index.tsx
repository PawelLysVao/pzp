import React, { ReactNode } from 'react';
import Logo from 'modules/Auth/component/Logo';
import './style.scss';

export interface Props {
  children: ReactNode;
}

class PublicWrapper extends React.Component<Props> {
  renderHeader(): ReactNode {
    return (
      <header id="header" className="d-flex justify-content-center">
        <Logo route="https://postepowania.pl/" />
      </header>
    );
  }

  renderContent(): ReactNode {
    const { children } = this.props;

    return <div className="public-content">{children}</div>;
  }

  renderFooter(): ReactNode {
    return (
      <footer id="footer">
        <div className="footer-content d-flex justify-content-between align-items-center flex-wrap">
          <div className="mb-2">
            <Logo route="https://postepowania.pl/" />
          </div>
          <ul className="mb-2 p-0 text-center list-unstyled d-flex justify-content-center flex-wrap">
            <li className="d-block d-md-inline m-0">
              <a href="https://postepowania.pl/polityka-prywatnosci/">
                POLITYKA PRYWATNOŚCI
              </a>
            </li>
            <li className="d-block d-md-inline m-0">
              <a href="https://postepowania.pl/regulamin/">REGULAMIN</a>
            </li>
            <li className="d-block d-md-inline m-0">
              <a href="https://postepowania.pl/kontakt/">KONTAKT</a>
            </li>
          </ul>
          <div className="mb-2" />
        </div>
      </footer>
    );
  }

  render(): ReactNode {
    return (
      <div className="public-wrapper h-100">
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default PublicWrapper;
