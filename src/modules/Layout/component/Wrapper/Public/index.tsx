import React, { ReactNode } from 'react';

export interface Props {
  children: ReactNode;
}

class PublicWrapper extends React.Component<Props> {
  renderContent(): ReactNode {
    const { children } = this.props;

    return <div className="public-content">{children}</div>;
  }

  render(): ReactNode {
    return (
      <div className="public-wrapper h-100">
        {this.renderContent()}
      </div>
    );
  }
}

export default PublicWrapper;
