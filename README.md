NOTE: This is a test repository for Tinder Online Assessment
------------------------------------------------------

## Pre-requisite:
--------------
* Update the `.env` file with the following details specific to your workspace:
  ```
    - USER_API_KEY=xoxp-XXX-XXX-XXX-XXX (User OAuth Token)
    - BOT_API_KEY=xoxb-XXX-XXX-XXX (Bot User OAuth Token)
    - CHANNEL_NAME='#random'
    - CHANNEL_ID=CXXXXX
  ```

 * Grant the following access/scope permission to the users
  - User: `chat:read`, `chat:write` and `channels:history`
  - Bot User: `chat:read`

## How to run the tests?
--------------------------------
You can run the test using either npm or jest

* Using NPM:
```
npm test or npm test --runInBand 
```
* Using Jest:
```
jest or jest --runInBand
```

## Sample output:
----------------------------------
* CLI output:
```
Test Suites: 5 passed, 5 total
Tests:       10 passed, 10 total
Snapshots:   10 passed, 10 total
Time:        4.487 s, estimated 8 s
Ran all test suites.
```

* Slack Screenshot:

![TinderOA-Sampleoutput](https://user-images.githubusercontent.com/11053031/127815387-e4264422-a695-4d05-9e70-609520c42d06.png)


