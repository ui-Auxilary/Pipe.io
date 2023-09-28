FROM node:20-slim AS base

RUN npm install -g pnpm 

COPY . /client
WORKDIR /client

RUN npm install pnpm
RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "run", "dev"]