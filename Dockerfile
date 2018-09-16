# source environment
FROM scratch AS source

COPY .docker/ /.docker/
COPY angular.json package.json package-lock.json tsconfig.json ngsw-config.json /app/
COPY src /app/src

# build environment
FROM node:10 AS builder

RUN set -x; npm i -g @angular/cli

COPY --from=source /app/ /app/

WORKDIR /app

RUN set -x; npm ci

RUN set -x; ng build --prod --output-path /dist/

# production
FROM httpd:2.4.34-alpine

RUN apk add --no-cache openssl

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY --from=source .docker/dockerize-templates/* /etc/dockerize-templates/

COPY --from=source .docker/.htaccess /usr/local/apache2/htdocs/

COPY --from=builder /dist/ /usr/local/apache2/htdocs/

RUN chmod -R g+r /usr/local/apache2/htdocs
RUN chgrp -R daemon /usr/local/apache2/htdocs

CMD dockerize -template /etc/dockerize-templates/httpd.conf.tmpl:/usr/local/apache2/conf/httpd.conf httpd-foreground
