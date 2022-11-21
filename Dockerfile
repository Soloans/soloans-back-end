FROM node:14.18
WORKDIR /cms-keystonejs
RUN apk --update add git
COPY package.json .
RUN yarn
COPY . .
# RUN yarn build
CMD ["yarn", "dev:docker"]
