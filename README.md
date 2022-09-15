### Adding more test mass

```sh
# Each execution adds 50.000 new users
npm run populate
```

### Running With Docker Compose

#### Build the image

```sh
docker build -t node-example .
```

#### Run containers

```sh
docker compose up -d --build
```

#### Enter in "node-example" container

```sh
docker exec -it node-example bash
```

#### Go to application and run the execution commands
```sh
cd /app

# Paginated query
npm run paginated

# Stream query
npm run stream
```

### Run MongoDB separately if you want
#### Is necessary to change the domain to `localhost` in `src/database/conn.mjs`
```sh
docker run -d \
  --name mongodb \
  -v $PWD/mongo:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=root \
  -p 27017:27017 \
  mongo
```


