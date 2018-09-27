# <%= projectName %>

> <%= description %>

<% if (!content) { -%>
## Install dependencies

Requirements:
* NodeJS (v8.10+)
* Gulp
* Typescript
* Jest (for testing)

```
npm install -g gulp
npm install
```

## Compile

Run:
```
gulp
```

This will compile the content of the `src` folder and generate the *js* code in the `<%= outputFolder %>` folder.


## Build script

Run:
```
npm run build
```

This is equivalent to running: `npm install && gulp`


## Unit tests

Run:
```
npm test
```


## Environment variables

The following environment variables need to be populated:
```
LOGGER_LEVEL=
```

<% if (cloudformation) { -%>

Those are defined in the `template.yml` deployment file.

<% } -%>

Note that before the unit tests are run, the environment variables are predefined
(see `.env.test`) for their definition details.


This will use *jest* framework to run the tests matching the `*.spec.ts` naming pattern.

<% } else { -%>
<%= content %>
<% } -%>
