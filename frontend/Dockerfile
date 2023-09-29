FROM node:20-slim

WORKDIR /client

COPY . /client

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 3000
ENTRYPOINT [ "pnpm", "run", "dev"]