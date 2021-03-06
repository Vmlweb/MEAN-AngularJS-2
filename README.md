# MEAN Stack Template

[![Build Status](http://bamboo.vmlweb.co.uk:8085/plugins/servlet/wittified/build-status/OPEN-MEAN)](http://bamboo.vmlweb.co.uk/browse/OPEN-MEAN)

Quick and simple template to get up and running with a productive MEAN stack web app inside of Docker.

## Technologies

  * [NodeJS 9.x](https://nodejs.org) on Linux, Mac or Windows
  * [Docker](https://docker.com) & [Compose](https://docs.docker.com/compose)
  * [Angular 5](https://angular.io) & [Typescript 2](https://www.typescriptlang.org)
  * [Gulp 4](http://gulpjs.com) & [Webpack 3](https://webpack.js.org)
  * [Semantic UI 2](http://semantic-ui.com)
  * [Cucumber 2](http://cucumber.io) & [Jasmine](https://jasmine.github.io)
  * [Karma](http://karma-runner.github.io) & [Istanbul](http://gotwarlost.github.io/istanbul)
  * [Winston](https://github.com/winstonjs/winston) & [PM2](http://pm2.keymetrics.io)

## Features

  * Dev, Test & Dist Modes
  * Linting & Type Checking
  * Minification & Obfuscation
  * Unit & Behaviour Driven Tests
  * Test Plans & Test Data Reset
  * Coverage & Test Reporting
  * Multi-Core & Load Balancing
  * Compatible with CI Tools
  * Hot Module Replacement

## Prequisitions

First make sure you have the following dependancies installed on your machine.

- `NodeJS` - Available for [All Platforms](https://nodejs.org/en/).
- `Docker` - Available for [Linux](https://docs.docker.com/engine/installation/linux/), [Mac](https://docs.docker.com/docker-for-mac/), [Windows](https://docs.docker.com/docker-for-windows/).

Then install the Gulp 4 and Bower command line tools if you have not already.

```bash
npm install -g gulpjs/gulp.git#4.0
```

Next clone the repository from GitHub.

```bash
git clone https://github.com/Vmlweb/MEAN-Angular.git
cd MEAN-Angular
```

## Installation

First install the project dependancies and setup the development environment.

```bash
npm install
gulp setup
```

Make sure to set a unique project name in `config.js` as it will stop docker containers from clashing.

## Directory Structure

- `builds` - Temporary development build files.
- `certs` - SSL certificate and key files.
- `client` - Client side website source.
- `client/app` - Angular app source.
- `data` - Development database binary files.
- `dist` - Production ready distribution builds.
- `logs` - Access, info and error log files.
- `logs/tests/server|client` - Coverage and testing reports.
- `logs/tests/merged` - Merged coverage reports.
- `semantic` - User interface customisations.
- `server` - Server side application source.
- `server/api` - REST API endpoints.
- `server/app` - Core functions for server app.
- `server/models` - Database models and schemas.
- `server/tests` - Test data management.
- `shared` - Modules used by both client and server.

## File Structure

- `client/main.ts` - Entry point for development and distribution builds.
- `client/tests/test-__.ts` - Entry point for testing builds.
- `config.js` - Configurations for development, testing and distribution.
- `database.js` - Start, stop and restart the production database container.
- `docker-compose.yml` - Docker compose definition for the production server.
- `Dockerfile` - Docker image definition for the distribution build.
- `mongodb.js` - Executed to configure database settings.
- `package.json` - Package dependancies.
- `server/main.ts` - Entry point for development and distribution builds.
- `server/tests/test-__.ts` - Entry point for testing builds.
- `server/tests/collections.ts` - List of database collections, models and test data.
- `server.sh` - Start, stop and restart the production app container.
- `tsconfig.json` - Typescript compilation options.
- `tslint.json` - Linting rules and options.

## Development

For development the primary working directories are.

- `client` - Client side website source.
- `semantic` - User interface customisations.
- `server` - Server side application source.
- `shared` - Modules used by both client and server.

You can start the development server which will rebuild any source file changes live.

```bash
gulp
```

Use `control + c` to stop and exit the development server.

Use the following to reset the development server database.

```bash
gulp reset
```

The development server stores its logs in the local directory.

To add non-standard browser libraries add the paths to `config.js` and they will be included in builds and testing.

## Logging

Use the following commands to log messages directly to the console and `logs` directory.

```javascript
log.error('ERROR'); //Error log file
log.warn('WARN'); //Info log file
log.info('info'); //Info log file
log.verbose('verbose'); //Access log file
```

Logs will automatically be sorted by severity and bundled into date files.

## Theming

You can make customisations to the site theme in the `semantic` directory.

The development environment can be started in theme mode which will rebuild changes live.

```
gulp theme
```

Please see the [Semantic UI](http://semantic-ui.com/usage/theming.html) theme guide for more information on this.

## Client Libraries

Adding client libraries into `libs.ts` will included them in your libs bundle.

Themes and libraries are cached so if changes are made to `libs.ts`, `vendor.ts` or the `semantic` directory you must clean the cache.

```
gulp clean
```

For traditional `index.html` style libraries or assets, add a glob expression to `config.js` under `libs` and they will be copied into the `/libs` directory.

## Testing

Test files should be included in the `server` and `client` directories and use the following extensions.

- `.unit.ts|js` - Jasmine unit tests.
- `.step.ts|js` - Cucumber step definiton.
- `.feature` - Cucumber feature specification.

You can execute tests either combined or individually for the server and client.

```bash
gulp test

gulp server.test
gulp client.test

gulp server.test.unit
gulp server.test.feature
```

You can also execute them in watch mode which will rebuild and test any source file changes live.

```bash
gulp server.unit
gulp server.feature
```

Testing and coverage reports will be generated in the `logs/tests` directory.

## Test Plans

You can create test plans in `config.js` which will only execute tests in a specified directory.

```
gulp server.v1.test
gulp client.services.test

gulp server.v1.test.unit
gulp server.v1.test.feature
```

These can also be executed in watch mode.

```
gulp server.v1.unit
gulp server.v1.feature
```

## Test Data

When testing, the server database will be reset before each test with the data found in `server/tests` JSON files.

You can add additional collections by specifying them in `server/collections.ts` with the model to use.

## Mock Server

When testing external applications you can run the server in mock mode which allows you to use test data.

```
gulp mock
```

You can use the following endpoint in mock mode to reset the test data in the server database.

```
DELETE /api
```

When running in mock mode please note that internal http and https ports are used.

## Distribution

To compile a production ready distribution build use the following command.

```bash
gulp dist
```

These files will be generated into the `dist` directory.

- `*.zip` - Docker image for distribution build.
- `database.js` - Start, stop and restart the production database container.
- `docker-compose.yml` - Docker compose definition for the production server.
- `mongodb.js` - Executed to configure database settings.
- `server.sh` - Start, stop and restart the production app container.

## Production

First import the Docker image onto the host machine.

```bash
unzip mean.zip
docker load < mean.tar
```

You must then copy `config.js` and the `certs` directory to their respective locations specified in `config.js`.

When using Linux make sure to set the correct file permissions for the certificates.

```bash
chown -R 999:999 /opt/mean/certs
```

Then wipe and configure your production database using `database.sh`.

```bash
chmod +x database.sh
./database.sh reset
```

When updating to a new build simply load in the new Docker image and restart the server.

## Process

Use can then use `server.sh` or `docker-compose.yml` to start, stop and restart your production server.

```bash
cmod +x server.sh
cmod +x database.sh

./server.sh start
./server.sh stop

./database.sh start
./database.sh stop

docker-compose up
docker-compose down
```
