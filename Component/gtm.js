import TagManager from 'react-gtm-module';

export const initializeGTM = () => {
  const tagManagerArgs = {
    gtmId: 'GTM-M2XPSMD',
  };

  TagManager.initialize(tagManagerArgs);
};