## 📥 `MongoDB Queries`
### This repository has a comparison between searching the database using and not using streams

#
## 🎯 `Results`
```sh
# With 100.000 registers
# i5 11400F (6 cores, 12 threads) 16GBs of RAM

npm run paginated
Done: 16.481s

npm run stream
Done: 3.497s
```

#
## 💡 `How it works`

### Running Without Docker Compose

#### First step is run your MongoDB locally.
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

#### If failed to connect to the database, add the user to the database which we will use in the mongo shell
```js
use example_db

db.createUser(
  {
    user: "root",
    pwd: "root",
    roles: [
       {role: "readWrite", db: "example_db"}
    ]
  }
)
```

#### The second step is add test mass in your database
```sh
# Each execution adds 50.000 new users
npm run populate
```

#### The last step is run the queries and compare the execution time
```sh
# Paginated query
npm run paginated

# Stream query
npm run stream
```

#
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
