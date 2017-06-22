FROM node:7.10.0-alpine
MAINTAINER David Schmitz <@koenighotze>

ENV CREATION_DAY 2017-05-10

RUN apk update
RUN apk upgrade
RUN apk add --update tini
RUN apk add wget
RUN adduser -h /home/app -s /bin/false -D app

WORKDIR /home/app/
COPY package.json .
RUN npm i && npm cache clean

COPY config/ config/
COPY src/ src/
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q http://localhost:8000/health/ || exit 1

EXPOSE 9229 8000
ENV NODE_ENV production

USER app
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "src/app.js"]