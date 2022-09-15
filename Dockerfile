FROM node:16.15.0
WORKDIR app
COPY package*.json ./
RUN npm i
COPY src/ src/
CMD tail -F anything
