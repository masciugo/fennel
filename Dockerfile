FROM node:6.7
ADD . /fennel
RUN apt-get update && apt-get install -y sqlite nano vim postgresql-client logrotate && npm i -g forever && cd /fennel && npm i
WORKDIR /fennel

CMD forever -o /var/log/fennel.log -e /var/log/fennel.err server.js
