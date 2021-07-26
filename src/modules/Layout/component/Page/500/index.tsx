import React from 'react';
import Page from 'modules/Layout/component/Page/index';

export const Page500: React.FC = (): JSX.Element => (
  <Page errorCode={500} errorText="Server error" />
);

export default Page500;
