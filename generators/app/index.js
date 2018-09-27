'use strict';
const _ = require('lodash');
const extend = _.merge;
const Generator = require('yeoman-generator');
const parseAuthor = require('parse-author');
const path = require('path');
const askName = require('inquirer-npm-name');
const validatePackageName = require('validate-npm-package-name');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('boilerplate', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Include boilerplate files'
    });

    this.option('cloudformation', {
      type: Boolean,
      required: false,
      default: true,
      desc: 'Include cloudformation template'
    });

    this.option('name', {
      type: String,
      required: false,
      desc: 'Project name'
    });

    this.option('repositoryName', {
      type: String,
      required: false,
      desc: 'Name of the GitHub repository'
    });

    this.option('readme', {
      type: String,
      required: false,
      desc: 'Content to insert in the README.md file'
    });
  }

  initializing() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    // Pre set the default props from the information we have at this point
    this.props = {
      name: this.pkg.name,
      description: this.pkg.description,
      version: this.pkg.version,
      homepage: this.pkg.homepage,
      repositoryName: this.options.repositoryName
    };

    if (this.options.name) {
      const name = this.options.name;
      const packageNameValidity = validatePackageName(name);

      if (packageNameValidity.validForNewPackages) {
        this.props.name = name;
      } else {
        throw new Error(
          packageNameValidity.errors[0] ||
            'The name option is not a valid npm package name.'
        );
      }
    }

    if (_.isObject(this.pkg.author)) {
      this.props.authorName = this.pkg.author.name;
      this.props.authorEmail = this.pkg.author.email;
      this.props.authorUrl = this.pkg.author.url;
    } else if (_.isString(this.pkg.author)) {
      const info = parseAuthor(this.pkg.author);
      this.props.authorName = info.name;
      this.props.authorEmail = info.email;
      this.props.authorUrl = info.url;
    }
  }

  _getModuleNameParts(name) {
    const moduleName = {
      name,
      repositoryName: this.props.repositoryName
    };

    if (moduleName.name.startsWith('@')) {
      const nameParts = moduleName.name.slice(1).split('/');

      Object.assign(moduleName, {
        scopeName: nameParts[0],
        localName: nameParts[1]
      });
    } else {
      moduleName.localName = moduleName.name;
    }

    if (!moduleName.repositoryName) {
      moduleName.repositoryName = moduleName.localName;
    }

    return moduleName;
  }

  _askForModuleName() {
    let askedName;

    if (this.props.name) {
      askedName = Promise.resolve({
        name: this.props.name
      });
    } else {
      askedName = askName(
        {
          name: 'name',
          default: path.basename(process.cwd())
        },
        this
      );
    }

    return askedName.then(answer => {
      const moduleNameParts = this._getModuleNameParts(answer.name);

      Object.assign(this.props, moduleNameParts);
    });
  }

  _askFor() {
    const prompts = [
      {
        name: 'type',
        message: 'Select type of project',
        type: 'list',
        choices: ['api-lambda', 'api-server', 'lib'],
        store: true
      },
      {
        name: 'description',
        message: 'Description',
        when: !this.props.description
      },
      {
        name: 'authorName',
        message: "Author's Name",
        when: !this.props.authorName,
        default: this.user.git.name(),
        store: true
      },
      {
        name: 'authorEmail',
        message: "Author's Email",
        when: !this.props.authorEmail,
        default: this.user.git.email(),
        store: true
      },
      {
        name: 'keywords',
        message: 'Package keywords (comma to split)',
        when: !this.pkg.keywords,
        filter(words) {
          return words.split(/\s*,\s*/g);
        }
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  prompting() {
    return this._askForModuleName()
      .then(this._askFor.bind(this))
  }

  writing() {
    // Re-read the content at this point because a composed generator might modify it.
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    const projectRoot = this.props.type === 'lib' ? 'lib' : 'dist';

    const pkg = extend(
      {
        name: this.props.name,
        version: '1.0.0',
        description: this.props.description,
        author: {
          name: this.props.authorName,
          email: this.props.authorEmail
        },
        files: [projectRoot],
        main: path.join(projectRoot, 'index.js').replace(/\\/g, '/'),
        keywords: [],
        devDependencies: {},
        dependencies: {},
        license: 'ISC',
        engines: {
          npm: '>= 4.0.0'
        }
      },
      currentPkg
    );

    // Combine the keywords
    if (this.props.keywords && this.props.keywords.length) {
      pkg.keywords = _.uniq(this.props.keywords.concat(pkg.keywords));
    }

    // Let's extend package.json so we're not overwriting user previous fields
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  default() {
    this.composeWith(require.resolve('../nsp'));

    this.composeWith(require.resolve('../tslint'));

    this.composeWith(require.resolve('../gulp'), {
      type: this.props.type
    });

    switch(this.props.type) {
      case 'api-server': {
        if (this.options.boilerplate) {
          this.composeWith(require.resolve('../boilerplate-api-server'));
        }
        if (this.options.cloudformation) {
          this.composeWith(require.resolve('../cloudformation'), {
            type: this.props.type
          });
        }
        break;
      }
      case 'api-lambda': {
        if (this.options.boilerplate) {
          this.composeWith(require.resolve('../boilerplate-api-lambda'));
        }
        if (this.options.cloudformation) {
          this.composeWith(require.resolve('../cloudformation'), {
            type: this.props.type
          });
        }
        break;
      }
      case 'lib': {
        if (this.options.boilerplate) {
          this.composeWith(require.resolve('../boilerplate-lib'));
        }
        break;
      }
      default: {
        throw new Error('Missing / unrecognised type!');
      }
    }

    if (!this.fs.exists(this.destinationPath('.gitignore'))) {
      this.composeWith(require.resolve('../git'));
    }

    if (!this.fs.exists(this.destinationPath('README.md'))) {
      this.composeWith(require.resolve('../readme'), {
        name: this.props.name,
        description: this.props.description,
        cloudformation: this.props.type === 'lib' ? false : this.options.cloudformation,
        outputFolder: this.props.type === 'lib' ? 'lib' : 'dist',
        content: this.options.readme
      });
    }
  }

  installing() {
    this.npmInstall();
  }

  end() {
    this.log('Thanks for using Yeoman.');
  }
};
