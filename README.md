# Web App based on React
## How to run app
You will need a [Docker](https://docker.com) to start this app
### Clone the repository
```shell
git clone https://github.com/zakh-d/python-fs-internship-frontend.git
```

### Run docker for production env
1. Build an image using
```
docker build -t [image name]
```
2. Run created image
```
docker run -d -p 80:80 [image name]
```

In production environment docker will build the app and host it using nginx.

### Run docker for development env
Create ```.env``` file based on ```.env.sample```

There is a docker compose file that would set everything up for dev environment
```
docker compose up -d
```
This would set up volumes so when there are changes in code server would automatically rebuild.