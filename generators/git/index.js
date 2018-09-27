'use strict';
const _ = require('lodash');
const Generator = require('yeoman-generator');
const rootPkg = require('../../package.json');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
  }

  writing() {
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
  }
};
