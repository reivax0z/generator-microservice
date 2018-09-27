'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('name', {
      type: String,
      required: true,
      desc: 'Project name'
    });

    this.option('description', {
      type: String,
      required: true,
      desc: 'Project description'
    });

    this.option('outputFolder', {
      type: String,
      required: true,
      desc: 'Folder containing the compiled code'
    });

    this.option('cloudformation', {
      type: Boolean,
      required: false,
      default: false,
      desc: 'Using Cloudformation template'
    });

    this.option('content', {
      type: String,
      required: false,
      desc: 'Readme content'
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        projectName: this.options.name,
        description: this.options.description,
        cloudformation: this.options.cloudformation,
        outputFolder: this.options.outputFolder,
        content: this.options.content
      }
    );
  }
};
