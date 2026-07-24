FROM node:24.18.0-alpine3.24@sha256:4ba75f835bb8802193e4c114572113d4b26f95f6f094f4b5229d2a77773e0afc
USER root

# Switch to UK Alpine mirrors, update package index and upgrade all installed packages
RUN echo "http://uk.alpinelinux.org/alpine/v3.24/main" > /etc/apk/repositories ; \
    echo "http://uk.alpinelinux.org/alpine/v3.24/community" >> /etc/apk/repositories ; \
    apk update && apk upgrade --no-cache

# Base image ships with npm 11.x, which currently pulls vulnerable transitive
# dependencies; pin npm to a patched release for deterministic image scans.
RUN npm install -g npm@12.0.1

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app

COPY --chown=999:998 . /app

RUN yarn install --frozen-lockfile --production && \
    yarn run postinstall

HEALTHCHECK --interval=5m --timeout=3s \
 CMD curl --fail http://localhost:8080 || exit 1

CMD ["sh", "/app/run.sh"]

EXPOSE 8080
