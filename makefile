DOCKER_REGISTRY ?= registry.hub.docker.io
GIT_SHORT_SHA := $(shell git log -1 --format="%h")

# The image name is the name of the folder, e.g: ms-cards, ms-file-upload etc.
IMAGE_NAMESPACE = incubus8
IMAGE_NAME := ms-notifications

# By default, we'll push the image as 'latest'. Override this env var if you
# want to 'make push' with a tag, semver or whatever.
IMAGE_TAG ?= latest

clean:
	rm -fr node_modules
	rm -fr ./packages/sms-core/node_modules
	rm -fr ./packages/sms-worker/node_modules
	rm -fr ./packages/sms-api-action/node_modules
	rm -fr ./packages/sms-api-category/node_modules
	rm -fr ./packages/sms-api-sender/node_modules
	rm -fr ./packages/sms-api-preset/node_modules
	rm -fr ./packages/sms-api-tracker/node_modules
	rm -fr ./packages/sms-api/node_modules

# Run local tests, with coverage.
install:
	npm config set strict-ssl false
	npm install --registry https://$(NPM_REGISTRY)
	npm --prefix ./packages/sms-core  --registry https://$(NPM_REGISTRY) install ./packages/sms-core
	npm --prefix ./packages/sms-worker  --registry https://$(NPM_REGISTRY) install ./packages/sms-worker
	npm --prefix ./packages/sms-api-action  --registry https://$(NPM_REGISTRY) install ./packages/sms-api-action
	npm --prefix ./packages/sms-api-category  --registry https://$(NPM_REGISTRY) install ./packages/sms-api-category
	npm --prefix ./packages/sms-api-preset  --registry https://$(NPM_REGISTRY) install ./packages/sms-api-preset
	npm --prefix ./packages/sms-api-sender  --registry https://$(NPM_REGISTRY) install ./packages/sms-api-sender
	npm --prefix ./packages/sms-api-tracker  --registry https://$(NPM_REGISTRY) install ./packages/sms-api-tracker
	npm --prefix ./packages/sms-api  --registry https://$(NPM_REGISTRY) install ./packages/sms-api

migrate:
	knex migrate:latest

db-setup:
	make migrate
	knex seed:run

# Build the Docker image and add the needed tags.
build:
	docker build \
		--build-arg=SERVICE_NAME=$(IMAGE_NAME) \
		--build-arg=NPM_REGISTRY=$(NPM_REGISTRY) \
		--build-arg=NPM_TOKEN=$(NPM_TOKEN) \
		--build-arg=HTTP_PROXY=$(HTTP_PROXY) \
		--build-arg=HTTPS_PROXY=$(HTTPS_PROXY) \
		-t=$(IMAGE_NAMESPACE)/$(IMAGE_NAME) .
	docker tag $(IMAGE_NAMESPACE)/$(IMAGE_NAME) $(IMAGE_NAMESPACE)/$(IMAGE_NAME):$(GIT_SHORT_SHA)

# TODO: Test this command.
# Pushes to the configured registry.
push:
ifndef env
	$(error 'push' must be provided an 'env' variable. e.g make push env=sit/dev/uat/prod)
endif
	# For production, the namespace is always 'incubus8'. For non-prod it's incubus8-{env}.
ifeq ($(env),prod)
	$(eval NAMESPACE=incubus8)
else
	$(eval NAMESPACE=incubus8-$(env))
endif
	docker tag $(IMAGE_NAMESPACE)/$(IMAGE_NAME):$(GIT_SHORT_SHA) $(DOCKER_REGISTRY)/$(NAMESPACE)/$(IMAGE_NAME):$(IMAGE_TAG)
	docker push $(DOCKER_REGISTRY)/$(NAMESPACE)/$(IMAGE_NAME):$(IMAGE_TAG)

# Make will get confused if there are files and folders with the names of
# recipes, unless we mark them as 'PHONY'.
.PHONY: clean install build push
