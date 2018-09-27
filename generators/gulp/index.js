'use strict';
const _ = require('lodash');
const Generator = require('yeoman-generator');
const rootPkg = require('../../package.json');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('type', {
      type: String,
      required: true,
      desc: 'Type of project'
    });
  }

  writing() {
    const pkgJson = {
      scripts: {
        build: "npm install && gulp"
      },
      devDependencies: {
        del: rootPkg.devDependencies.del,
        "gulp": rootPkg.devDependencies.gulp,
        "gulp-add-src": rootPkg.devDependencies['gulp-add-src'],
        "gulp-tslint": rootPkg.devDependencies['gulp-tslint'],
        "gulp-typescript": rootPkg.devDependencies['gulp-typescript'],
        merge2: rootPkg.devDependencies.merge2
      }
    };

    this.fs.extendJSON(
      this.destinationPath('package.json'),
      pkgJson
    );

    this.fs.copy(
      this.templatePath(this.options.type === 'lib' ? 'gulpfile-lib.js' : 'gulpfile-api.js'),
      this.destinationPath('gulpfile.js')
    );
  }
};
