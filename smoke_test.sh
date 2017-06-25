#!/bin/sh

status=$(http http://senacor-aktuelles.eu-west-1.elasticbeanstalk.com/health/ | jq '.status')
event=$(http http://senacor-aktuelles.eu-west-1.elasticbeanstalk.com/events/ | jq '.[0] | .title')

if [ "$status" != '"ok"' ];
then
  echo "App is NOT up and running...got status $status"
  exit 1
fi

if [ "$event" == 'null' ];
then
  echo "App is NOT up and running...cannot fetch events"
  exit 1
fi

echo App is healthy
exit 0

