# local-file-monitor
This is a sample of local file monitor with a key-value store in redis and 100% code coverage with unit tests

## GitHub Repository
[![`GitHub`](https://img.shields.io/github/package-json/v/OrenVilderman/local-file-monitor?logo=github)](https://github.com/OrenVilderman/local-file-monitor.git)
[![Tests](https://github.com/OrenVilderman/local-file-monitor/actions/workflows/test.yml/badge.svg)](https://github.com/OrenVilderman/local-file-monitor/actions/workflows/test.yml)


## Production Usage/Implementation
`cron.service.ts` - is a service that contains logs that report the file feeds status, this is recommended to add a Web service and use it to send the information from file storages that get feeds to a server that can analyze the data.

```typescript
console.info('back to normal');
//TODO: Recommended location to add call to a web service
```

```typescript
console.warn(`Warning: No new feed file received in the last ${intervalTime} or more minutes`);
//TODO: Recommended location to add call to a web service
```

## Installation
Install by running 
``` 
npm install
```

## Start the program with debug* (Optional to use F5 before running the script)
Start the program by running:
``` 
npm start
```
*The program is meant to be used with a redis-server that is running on the file feed server,  
To use this program with redis-server that is not on the default port - Please edit the `REDIS_URL` in the `.env` file

## Start the jest coverage tests that will print the full Jest HTML coverage report
Start the tests by running:
``` 
npm test
```
*The unit tests are meant to be used without a redis-server as an example of a more complex mock.  

## Unit tests cover status:
<img alt="Image_Of_Unit_Tests_Cover_Report" src="images\Unit_Tests_Cover.png" style="min-width:800px; width:1200px;"/>

## Unit tests mock example
`feeds.service.test.ts` - The `fs.stat` function return a promise that can be rejected,
The challenge is how to reject this within a Unit Test - to meet this challenge in a simple way and achieve 100% code coverage,  
I used sinon with stub to mock the response of the `fs.stat` function.
```typescript
it('FS Stat Error (Mock)', async () => {
    sinon
    .stub(fs, 'stat').yields({ message: 'Test_Stat_Error' }, null);
...
```

## Pull Request / Contribute
PRs are only possible from a separate branch.

Before submitting a PR please validate lint, unit tests, test cover and version update:
- You should fix linting issues by running `npm run fix-lint` - Make sure to fix every error and warning.
- You should run unit tests by running `npm test` - Make sure that all the tests pass.
- The test coverage should remain at **100%**: `100% Statements 78/78 | 100% Branches 22/22 | 100% Functions 25/25 | 100% Lines 70/70` - Make sure to add tests if needed.
- **Always** increment* the version, according to the specifications below.
- Adding a unit test that uncovers a bug is very welcome - I will create a fix for the bug that will allow you to pull and merge your unit test ASAP.

*The correct way to increment the version is by using the correct npm script that represent the change you are introducing

## Versions
Run `npm version patch` in cases of bug fixes or small modifications.

Run `npm version minor` in cases of functionality changes with **non-breaking** changes.

Run `npm version major` in cases of important functionality or any **breaking** changes.
