# Server for exposing Senacor news via REST

[![Build Status](https://travis-ci.org/koenighotze/senacor-news.svg?branch=master)](https://travis-ci.org/koenighotze/senacor-news)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/06a87286eb8049559ac35621e6dfcd5e)](https://www.codacy.com/app/david-schmitz-privat/senacor-news?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=koenighotze/senacor-news&amp;utm_campaign=Badge_Grade)

## Overview

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium deleniti eius quo reiciendis voluptatum doloribus harum nihil, nesciunt, sint autem cumque laudantium, esse. Dolorum cum rem similique doloribus rerum fugit?

## Try it with Docker

Build the image locally:

```
npm run docker.build
```

Run the image either with

```
npm run docker.run
```

or

```
docker run --rm=true -p 8000:8000 koenighotze/senacor-news
```

## API

The application exposes the following endpoints:

- `<host:port>/events/`: exposes Senacor events
- `<host:port>/senacor/`: deprecated, same as the `event` endpoint
- `<host:port>/health/`: used for checking the health of the application


### Events

This is an example output:

```json
[
    {
        "date":     "22.06.2017",
        "location": "Berlin",
        "summary":  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis
                     optio adipisci, reiciendis id voluptatibus minus, earum",
        "title":    "Senacor Summer Camp"
    },
    {
        ...
    }
]
```


### Health

This is an example output, if the app is healthy:

```json
{
    "status": "ok"
}
```

## Deployment on Amazon Elastic Beanstalk

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt mollitia repellat magni dolorum, ipsum cum optio iusto, dolorem, illum quis saepe. Explicabo, debitis laudantium ipsam consequatur tempora, illum dignissimos sit!

## Changelog

- **2017-06-22** - Extracted from monolithic repository and added auto deployment

## License

Copyright David Schmitz. Licensed under MIT. http://opensource.org/licenses/MIT