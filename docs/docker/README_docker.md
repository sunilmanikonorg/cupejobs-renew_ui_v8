# Docker README

### Environment variables (.env)

```commandline
NEXT_PUBLIC_CUPEJOBS_HOST=
NEXT_PUBLIC_ARMS_HOST=
CUPEJOBS_UI_PORT=3000

ORACLE_DB_URL=
BATCH_USER_MID=
BITBUCKET_USERNAME=
BITBUCKET_APP_PASSWORD=
ARMS_PORT=8002

DB_NAME=
DB_URL=mongodb://${MONGO_APP_USERNAME}:${MONGO_APP_PASSWORD}@host.docker.internal:27017/${DB_NAME}?authSource=admin
ARMS_API_URL=http://host.docker.internal:8002
CUPEJOBS_UI_URL=http://host.docker.internal:3000
JWT_SECRET_KEY=/PATH_TO_/jwt_secret_key.txt
JWT_SECRET_KEY_ID_RSA_PASSWORD=
JWT_ACCESS_TOKEN_SECRET_KEY_PRIVATE_KEY=/PATH_TO_/private.pem
JWT_ACCESS_TOKEN_SECRET_KEY_PUBLIC_KEY=/PATH_TO_/public.pem
JWT_REFRESH_TOKEN_SECRET_KEY_PRIVATE_KEY=/PATH_TO_/private.pem
JWT_REFRESH_TOKEN_SECRET_KEY_PUBLIC_KEY=/PATH_TO_/public.pem
CUPEJOBS_PORT=8001

MONGO_INITDB_DATABASE=armsdb

# Admin user credentials
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=

# Application user credentials
MONGO_APP_USERNAME=
MONGO_APP_PASSWORD=

# Copy /docker-entrypoint-initdb.d/mongo-init.js under ${MONGO_VOLUME_ROOT} before creating the docker stack (docker compose up).
# MongoDB container creates the data/db volume on initialization, and runs the /docker-entrypoint-initdb.d/mongo-init.js script.
# If data/db already exists, /docker-entrypoint-initdb.d/mongo-init.js script will be ignored.
# https://docs.docker.com/desktop/settings/mac/#file-sharing
MONGO_VOLUME=

# Volume for storing SSH keys
CUPEJOBS_VOLUME=
```

### Method #1: Using Portainer docker stack ( host.docker.internal )

* Build docker image and push to docker hub repository

#### Project repositories: [ arms-renew_api, cupejobs-renew_api & cupejobs-renew_ui_v6 ]

```commandline
cd arms-renew_api
docker buildx build -t $DOCKER_HUB_USER/arms-renew_api:latest .
docker login -u $DOCKER_HUB_USER -p $DOCKER_HUB_PASSWORD
docker push $DOCKER_HUB_USER/arms-renew_api:latest

cd cupejobs-renew_api
docker buildx build -t $DOCKER_HUB_USER/cupejobs-renew_api:latest .
docker login -u $DOCKER_HUB_USER -p $DOCKER_HUB_PASSWORD
docker push $DOCKER_HUB_USER/cupejobs-renew_api:latest

cd cupejobs-renew_ui_v6
docker buildx build --build-arg NEXT_PUBLIC_CUPEJOBS_HOST=http://host.docker.internal:8001 --build-arg NEXT_PUBLIC_ARMS_HOST=http://host.docker.internal:8002 -t $DOCKER_HUB_USER/cupejobs-renew_ui:latest .
docker login -u $DOCKER_HUB_USER -p $DOCKER_HUB_PASSWORD
docker push $DOCKER_HUB_USER/cupejobs-renew_ui:latest
```

#### Step 1: Copy/Paste or upload docker-compose.yml contents into the Web Editor

![dockerstack.png](dockerstack.png)

#### Step 2:  Load environment variables from .env file

![env_variables.png](env_variables.png)

#### Step 3: Deploy stack

### Method #2: Build a docker image and run a standalone docker container using docker-compose.yml

* Validate and review the compose file

```commandline
docker compose config
```

* Build services

```commandline
docker compose build
```

* Create and start container

```commandline
docker compose up
```

### Method #3: Create a User-defined Bridge network for the 4 standalone docker containers

* arms-api-container
* cupe-api-container
* cupe-ui-container
* mongo-container

```commandline
docker network create --driver bridge cupe-net
```

### Run MongoDB standalone docker container on a user defined bridge network

```commandline
docker run -d -p 27017:27017 /
--name mongo-container /
--network cupe-net /
-e MONGO_INITDB_ROOT_USERNAME={MONGO_INITDB_ROOT_USERNAME} /
-e MONGO_INITDB_ROOT_PASSWORD={MONGO_INITDB_ROOT_PASSWORD} /
-v ~/dataMongo:/data/db /
-v PATH_TO/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro /
mongo:latest
```

### Build docker image and run a standalone docker container on a user defined bridge network (Dockerfile)

* Build image

```commandline
docker image build -t arms-renew_api .
docker image build -t cupejobs-renew_api .
docker image build -t cupejobs-renew_ui .
```

* Create and start container

```commandline

docker run -d -p 8002:8002 --name arms-api-container --network cupe-net --env-file=.env arms-renew_api

docker run -d -p 8001:8001 /
--name / cupe-api-container /
--network cupe-net /
--env-file=.env /
-v /PATH_TO/private.pem:/private.pem:ro /
-v /PATH_TO/public.pem:/public.pem:ro /
-v /PATH_TO/jwt_secret_key.txt:/jwt_secret_key.txt:ro /
cupejobs-renew_api

docker run -d -p 3000:3000 --name cupe-ui-container --network cupe-net --env-file=.env cupejobs-renew_ui

```