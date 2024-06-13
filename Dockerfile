FROM node:16.17-alpine as base

RUN yarn global add pnpm

FROM base as dependencies

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base as builder

WORKDIR /app

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist .

CMD [ "nginx", "-g", "daemon off;" ]
