# Telstra Micro-service Generator

> Creates a base template to start a new Telstra **Node.js API** micro-service. 
  Forked from [generator-node](https://github.com/yeoman/generator-generator)


## Install

```bash
$ npm install -g yo
$ npm install
$ npm link
```


## Usage

Create your new Project:
```bash
$ mkdir my-new-project
$ cd my-new-project
```

Use the generator:
```bash
$ yo micro-service
```

*Note that this template will generate files in the current directory, so be sure to change to a new directory first if you don't want to overwrite existing files.*

That'll generate a project with all the common tools setup. This includes:

- Filled `package.json` file
- Skeleton for `src` and `test` folders
- **gulp:** build management tool
- **jest:** unit test and code coverage
- **TSLint:** linting and code style checking
- **README:** documentation about the project and main commands
- **nsp:** known vulnerability check
- **cloudformation:** the cloudformation deployment template


### Supported Types

Currently the generator supports:

- **api-lambda:** Skeleton for an API micro-service (lambda)
- **api-server:** Skeleton for an API micro-service (express-server)
- **lib:** Skeleton for a shared library


### Options

Here's a list of the supported options:

- `boilerplate` (Boolean, default true) include or not the boilerplate files (`src/index.ts`, `test/index.spec.ts`, ...).
- `cloudformation` (Boolean, default true) include or not the cloudformation deployment template.
- `name` (String) the project name. If not provided, you will be prompted for it.
- `readme` (String) content of the `README.md` file. Given this option, overrides the default one. The generator will still generate the title.

Use like:
```bash
$ yo micro-service --name=my-awesome-project
```

### Sub generators

If you don't need all the features provided by the main generator, you can still use a limited set of features by composing with our sub generators directly.

Remember you can see the options of each sub generators by running `yo micro-service:sub --help`.

- `micro-service:boilerplate-api-lambda`
- `micro-service:boilerplate-api-server`
- `micro-service:boilerplate-lib`
- `micro-service:cloudformation`
- `micro-service:gulp`
- `micro-service:git`
- `micro-service:nsp`
- `micro-service:readme`
- `micro-service:tslint`


### TODO 
- Add support for local testing
- Add standalone build / deployment scripts to AWS