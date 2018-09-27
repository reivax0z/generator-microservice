'use strict';
const Generator = require('yeoman-generator');
const rootPkg = require('../../package.json');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
  }

  writing() {
    const pkgJson = {
      devDependencies: {
        tslint: rootPkg.devDependencies.tslint,
        "tslint-config-airbnb": rootPkg.devDependencies['tslint-config-airbnb']
      }
    };

    this.fs.extendJSON(
      this.destinationPath('package.json'),
      pkgJson
    );

    this.fs.copy(
      this.templatePath('tslint.json'),
      this.destinationPath('tslint.json')
    );
  }
};
