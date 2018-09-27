'use strict';
const _ = require('lodash');
const Generator = require('yeoman-generator');
const rootPkg = require('../../package.json');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
  }

  writing() {
    const pkgJson = {
      scripts: {
        build: "npm install && gulp",
        test: "env-cmd .env.test jest"
      },
      main: "./dist/index.js",
      devDependencies: {
        "@types/jest": rootPkg.devDependencies['@types/jest'],
        "@types/node": rootPkg.devDependencies['@types/node'],
        "aws-sdk-mock": rootPkg.devDependencies['aws-sdk-mock'],
        del: rootPkg.devDependencies.del,
        "env-cmd": rootPkg.devDependencies['env-cmd'],
        jest: rootPkg.devDependencies.jest,
        supertest: rootPkg.devDependencies.supertest,
        "ts-jest": rootPkg.devDependencies['ts-jest'],
        tslint: rootPkg.devDependencies.tslint,
        "tslint-config-airbnb": rootPkg.devDependencies['tslint-config-airbnb'],
        typescript: rootPkg.devDependencies.typescript
      },
      dependencies: {
        "aws-sdk": rootPkg.dependencies['aws-sdk'],
        express: rootPkg.dependencies.express,
        http: rootPkg.dependencies.http,
        https: rootPkg.dependencies.https,
        lodash: rootPkg.dependencies.lodash,
        request: rootPkg.dependencies.request,
        "request-promise": rootPkg.dependencies['request-promise'],
        winston: rootPkg.dependencies.winston
      },
      jest: rootPkg.jest
    };

    this.fs.extendJSON(
      this.destinationPath('package.json'),
      pkgJson
    );

    this.fs.copy(
      this.templatePath('src/**/*'),
      this.destinationPath('src')
    );

    this.fs.copy(
      this.templatePath('test/**/*'),
      this.destinationPath('test')
    );

    this.fs.copy(
      this.templatePath('.env.test'),
      this.destinationPath('.env.test')
    );

    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );
  }
};
