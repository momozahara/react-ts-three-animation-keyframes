FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS dep
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=dep /app/node_modules ./node_modules
RUN pnpm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist .
CMD [ "nginx", "-g", "daemon off;" ]
