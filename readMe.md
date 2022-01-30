# Site monitoring api server
An uptime monitoring RESTful API server which allows authorized users to enter URLs they want monitored, and get detailed uptime reports about their availability, average response time, and total uptime/downtime.

## Features
The user can:
  - sign up with email verification
  - add a url with some configuration to monitor it and get periodic alerts about it
  - update url configuration
  - delete his subscription to certain url check
  - get his pre-entered url checks

The user will receive periodic email/Webhook alert updates when a pre-entered url is went down or up.

## Docs
You can find swagger documentation [here](https://monitor-url-api.herokuapp.com/api-docs/#/)

## Restrictions
- `Interval` between url checks shouldn't be more 1550 minute (24 hours)
- Url protocol should be `HTTP` or `HTTPS` only ... `TCP` requests not valid now.

## Future work
- To add mobile push notification
