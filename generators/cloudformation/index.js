'use strict';
const Generator = require('yeoman-generator');

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
    this.fs.copy(
      this.templatePath(this.options.type === 'api-lambda' ? 'template-lambda.yml' : 'template-server.yml'),
      this.destinationPath('template.yml')
    );
  }
};
