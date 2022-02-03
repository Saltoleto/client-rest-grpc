FROM node:14-alpine

# Install package dependencies
COPY package.json /app/
COPY yarn.lock /app/
COPY swagger.js /app/

WORKDIR /app

RUN yarn install

COPY babel.config.js /app/
COPY .env /app/
COPY swagger.json /app/

# Copy project source after the dependencies get installed.
COPY ./src/. /app/src/

EXPOSE 3000
ENV HOST=0.0.0.0

# Execute web app at port 3000
CMD [ "yarn", "start" ]