# Amy-Web
[![Build Status](https://travis-ci.com/AmyAssist/Amy-Web.svg?branch=master)](https://travis-ci.com/AmyAssist/Amy-Web)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=de.unistuttgart.iaas.amyassist%3Aamy-web&metric=coverage)](https://sonarcloud.io/component_measures?id=de.unistuttgart.iaas.amyassist%3Aamy-web&metric=Coverage)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=de.unistuttgart.iaas.amyassist%3Aamy-web&metric=ncloc)](https://sonarcloud.io/dashboard?id=de.unistuttgart.iaas.amyassist%3Aamy-web)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=de.unistuttgart.iaas.amyassist%3Aamy-web&metric=bugs)](https://sonarcloud.io/component_measures?id=de.unistuttgart.iaas.amyassist%3Aamy-web&metric=Reliability)
[![Reliability](https://sonarcloud.io/api/project_badges/measure?project=de.unistuttgart.iaas.amyassist%3Aamy-web&metric=reliability_rating)](https://sonarcloud.io/component_measures?id=de.unistuttgart.iaas.amyassist%3Aamy-web&metric=Reliability)

[![Docker](http://dockeri.co/image/amyassist/amy-web)](https://hub.docker.com/r/amyassist/amy-web/)

Web-Applikation for the personal assistance system called Amy.
The Web-Applikation is based on AngularJS.

The web app first needs a backend URL to connect to. For information on how to deploy the backend see [Amy](https://github.com/AmyAssist/Amy).
It is possible to configure the default URL entered into that field when loading the page. This is archived by editing the webAppServerInfo.json either in the src directory before compiling or in the dist directory after compiling.


The web app can also be started as a docker container by running ```docker run -e SERVER_NAME=<name>```. The ```name``` is used as the server name for apache2 server inside.
To be able to configure the default backend URL one must first copy the webAppServerInfo.json from [the repository](src/webAppServerInfo.json) and place it somewhere on your system.
Then it needs to be bound into the container by using ``` -v <json location>:/usr/local/apache2/htdocs/webAppServerInfo.json ``` as an argument to the docker run command.
