# docker-node-redis
Boilerplate for a Redis + Node + Docker service

# Install <a href='https://docs.docker.com/install/'>Docker</a>
Install docker on your OS following the documentation 

# pull Docker images
Docker images can be found at <a href='https://hub.docker.com/'>Docker Hub</a>, they are the images we will use to run our containers. In this case, images for Node and Redis. 
```
$ docker pull node
$ docker pull redis
```

# Docker Compose
<a href='https://docs.docker.com/compose/'>Docker Compose</a> is a tool for defining and running multi-container, the architecture used for containers is based on the 'single-purpose' service. In this case, one (`app`) will be your UI server and `redis` our database. I might add RabbitMQ in the future.
In summary `docker-compose.yml` is a YAML file that describes to docker how to run multiple containers, we can define how the containers will be linked in a better way than multiple DockerFiles.

A minimal version of our docker could be:
```yaml
version: "3.7"
services:
  redis:
    image: "redis" #the pulled image
    expose:
      - 6379 #which port the container will expose, this is Redis default port
  app:
    build: ./app
    ports:
      - "3000:8080" #binds the host (your computer) port 3000 to the container's 8080 port
    command: npm start #runs the app with nodemon
    links:
      - redis #links this container with the other container
    environment:
      - REDIS=redis #shares the 'redis' name.. just easier to change in the future.
```

# Running the containers
```
$ cd docker-node-redis
$ docker-compose up
```
open a browser at `http://localhost:3000` and you should see a simple counter. 
this project is set using <a href='https://www.npmjs.com/package/nodemon'>nodemon</a>, so you can make changes on `./app/src/index.js`, reload the webpage and see the changes