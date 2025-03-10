# FROM node:18-alpine@sha256:2322b1bb3917b313f2e9308395aa5c39d51b91cc92a5d4d5be6d0451fcfb4d24
FROM node:20.18.0-alpine3.20@sha256:d504f23acdda979406cf3bdbff0dff7933e5c4ec183dda404ed24286c6125e60

USER root

RUN apk update && \
    apk add --upgrade gnutls binutils nodejs npm apk-tools libjpeg-turbo libcurl libx11 libxml2

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app

COPY --chown=999:998 . /app

RUN yarn install --frozen-lockfile --production --ignore-optional && \
    yarn run postinstall

HEALTHCHECK --interval=5m --timeout=3s \
 CMD curl --fail http://localhost:8080 || exit 1

CMD ["sh", "/app/run.sh"]

EXPOSE 8080
