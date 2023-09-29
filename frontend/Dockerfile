FROM node:20-slim

COPY . /client
WORKDIR /client

RUN npm install -g pnpm
RUN pnpm install

EXPOSE 3000
ENTRYPOINT [ "pnpm", "run", "dev"]