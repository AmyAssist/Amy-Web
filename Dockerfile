FROM neumantm/httpd-npm:2.4.34-v8.11.3

RUN set -x; npm i -g @angular/cli

RUN apk add --no-cache openssl

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY angular.json package.json package-lock.json tsconfig.json /app/
COPY src /app/src

WORKDIR /app

RUN set -x; npm install

RUN set -x; ng build --output-path /usr/local/apache2/htdocs/

COPY .docker/dockerize-templates/* /app/dockerize-templates/

CMD dockerize -template dockerize-templates/httpd.conf.tmpl:/usr/local/apache2/conf/httpd.conf httpd-foreground