# local-file-monitor
This is a sample of local file monitor with a key-value store in redis and 100% code coverage with unit tests

## Production Usage/Implementation
`cron.service.ts` - is a service that contain logs that report the file feeds status, this is recommended to add a Web service and use it to send the information from file storages that get feeds to a server that can analize the data.

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

## Start the jest coverage tests that will print the full Jest HTML coverage report
Start the tests by running:
``` 
npm test
```

## Unit tests cover status:
<img alt="Image_Of_Unit_Tests_Cover_Report" src="images\Unit_Tests_Cover.png" style="min-width:800px; width:1200px;"/>

## Pull Request / Contribute
PRs are only possible from a separate branch.

Before submitting a PR please validate lint, unit tests, test cover and version update:
- You should fix linting issues by running `npm run fix-lint` - Make sure to fix every error and warning.
- You should run unit tests by running `npm test` - Make sure that all the tests pass.
- The test coverage should remain at **100%**: `100% Statements 78/78 | 100% Branches 22/22 | 100% Functions 25/25 | 100% Lines 70/70` - Make sure to add tests if needed.
- **Always** increment* the version, according to the specifications below.
- Adding a unit test that uncover a bug is very welcome - I will create a fix for the bug that will allow you to pull and merge your unit test ASAP.

*The correct way to increment the version is by using the correct npm script that represent the change you are introducing

## Versions
Run `npm version patch` in cases of bug fixes or small modifications.

Run `npm version minor` in cases of functionality changes with **non-breaking** changes.

Run `npm version major` in cases of important functionality or any **breaking** changes.
