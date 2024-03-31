FROM node:19.6.0
LABEL maintainer="Daniels Haitovs (danikhatov@gmail.com)"
RUN mkdir /code
WORKDIR /code

COPY . /code/
RUN npm install --production

CMD ["npm", "start"]