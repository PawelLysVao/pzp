import React from 'react';
import Page from 'modules/Layout/component/Page/index';

export const Page403: React.FC = (): JSX.Element => (
  <Page errorCode={403} errorText="Access denied" />
);

export default Page403;
