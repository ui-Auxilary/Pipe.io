FROM node:20-slim AS base

RUN npm install -g pnpm 

COPY . /client
WORKDIR /client

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
RUN pnpm install

FROM base
COPY --from=prod-deps /client/node_modules /client/node_modules

RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "run", "dev"]