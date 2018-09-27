'use strict';

module.exports = {
  app: require.resolve('./generators/app'),
  'boilerplate-api-lambda': require.resolve('./generators/boilerplate-api-lambda'),
  'boilerplate-api-server': require.resolve('./generators/boilerplate-api-server'),
  'boilerplate-lib': require.resolve('./generators/boilerplate-lib'),
  cloudformation: require.resolve('./generators/cloudformation'),
  git: require.resolve('./generators/git'),
  gulp: require.resolve('./generators/gulp'),
  nsp: require.resolve('./generators/nsp'),
  readme: require.resolve('./generators/readme'),
  tslint: require.resolve('./generators/tslint')
};
