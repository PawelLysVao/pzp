import React from 'react';
import Page from 'modules/Layout/component/Page/index';

export const Page404: React.FC = (): JSX.Element => (
  <Page errorCode={404} errorText="Page not found" />
);

export default Page404;
