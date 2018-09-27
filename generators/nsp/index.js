'use strict';
const Generator = require('yeoman-generator');
const rootPkg = require('../../package.json');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
  }

  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      devDependencies: {
        nsp: rootPkg.devDependencies.nsp
      },
      scripts: {
        prepublishOnly: 'nsp check'
      }
    });
  }
};
