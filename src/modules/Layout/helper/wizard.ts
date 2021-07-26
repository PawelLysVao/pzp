// eslint-disable-next-line import/prefer-default-export
export const scrollToTabs = (): void => {
  const tabElement = document.getElementsByClassName('tabs')[0];
  if (tabElement) {
    tabElement.scrollIntoView();
  }
};
