# node-notifications [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](http://www.free-online-calculator-use.com/yield-to-maturity-calculator.html)[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

Complete microservice for smsgw, 100% revamp from ROR.

## Using the Microservice

### Requirements
1. [Node Package Manager (NVM)](https://github.com/creationix/nvm)
2. [NodeJS (8.9.1 or Latest LTS)](nodejs.org)
3. [Lerna](https://github.com/lerna/lerna) `npm i -g lerna`
4. [Postgres 10 or above](https://www.postgresql.org/)
5. [Redis Server 4.x or above](https://redis.io/)

### Getting Started
Install all dependencies:
```shell
$ git clone https://github.com/incubus8
$ make install
$ npm i -g knex
```

To clean modules:
```shell
$ make clean
```

### Database Migration
*You must follow previous step in getting started.*

```shell
$ cd packages/sms-core
$ npm i
$ npm run migrate
```

### Database Seed
Follow database migration step, after that execute the command below:

```shell
$ npm run seed
```

### Run Server
```shell
$ cd packages/sms-api
$ npm i
$ npm start
```

## Setting up New Relic

The following environment variables are needed:
```shell
$ NEW_RELIC_LICENSE_KEY=xxxxxxxx
$ NEW_RELIC_APP_NAME=microservice-smsgw
$ NEW_RELIC_LABELS=Environment:Local
$ NEW_RELIC_HOME=newrelic.js
```

## High-level Repository Structure
```shell
.
├── README.md
├── deploy
├── docs
│   ├── CHANGELOG.md
│   ├── Gemfile
│   ├── Gemfile.lock
│   ├── LICENSE
│   ├── README.md
│   ├── Vagrantfile
│   ├── config.rb
│   ├── deploy.sh
│   ├── font-selection.json
│   ├── lib
│   └── source
├── lerna-debug.log
├── lerna.json
├── package-lock.json
├── package.json
└── packages
    ├── sms-admin
    ├── sms-api
    ├── sms-api-action
    ├── sms-api-category
    ├── sms-api-preset
    ├── sms-api-sender
    ├── sms-api-tracker
    ├── sms-core
    └── sms-worker
```

## TODO
In addition, below are tasks what need to be done:
- [x] Handle SOAP request
- [ ] Write API documentation
- [ ] Implement admin frontend
- [ ] Implement retry job API
- [x] Implement sms categories API
- [x] Implement sms presets API
- [x] Implement sms senders API
- [x] Implement sms trackers API
- [x] Update README for more details how to deploy
- [ ] Implement other channels

## Special Thanks
This project won't be possible without the following stacks:
- Fastify from `NearForm`
- Postgres
- Redis
- NodeJS

## Author
2017-2018 :copyright: Rheza Satria, Bosan Tech.

---

Made with :love_letter: in JKT
