FROM node:23-slim

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

ENV HOST=0.0.0.0

ENV PORT=3000

CMD ["yarn", "start"]