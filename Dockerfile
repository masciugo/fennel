FROM node:boron
ADD . /fennel
RUN apt-get update && apt-get install -y sqlite nano vim postgresql-client logrotate 
RUN cd /fennel && yarn
WORKDIR /fennel

CMD node server.js
