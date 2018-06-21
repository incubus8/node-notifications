FROM node:8.9.4

# Environment variables which handle runtime behaviour.
ONBUILD ARG SERVICE_NAME=service
ONBUILD ARG NPM_REGISTRY=registry.npmjs.org
ONBUILD ARG NPM_TOKEN
ONBUILD ARG HTTP_PROXY
ONBUILD ARG HTTPS_PROXY
ONBUILD WORKDIR /home/${SERVICE_NAME}

# Create an .npmrc file.
ONBUILD RUN echo "strict-ssl=false" > .npmrc && \
    echo "//${NPM_REGISTRY}/:_authToken=${NPM_TOKEN}" >> .npmrc

# If a proxy has been set, update the NPM configuration.
ONBUILD RUN if [ -n "$HTTP_PROXY" ]; then npm config set proxy "$HTTP_PROXY"; fi
ONBUILD RUN if [ -n "$HTTPS_PROXY" ]; then npm config set https-proxy "$HTTPS_PROXY"; fi

ENV SERVICE_PORT 3000
ENV WAIT_START 0

COPY . .
RUN make install

# Expose, wait as long as specified, then start the server.
# TODO: This is a nasty bug - we are not running npm as pid 1, we are running echo and sleep, meaning that the container will not shut down gracefully. We're working on this with:
EXPOSE ${SERVICE_PORT}
CMD echo "Waiting for ${WAIT_START}s..." && sleep ${WAIT_START} && cd packages/sms-api && npm start
