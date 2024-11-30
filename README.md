# Voting-Docker

`docker-compose up --build`

## 在 `/database` 目录运行

docker build -t postgres-container .

docker run -d --name postgres-instance -p 5432:5432 --env-file .env postgres-container

## 在 `/backend` 目录运行

docker build -t voting-backend-service .

docker run -d --name voting-backend-service -p 8000:8000 voting-backend-service

## 在 `/frontend` 目录运行

docker build -t voting-frontend-service .

docker run -p 6110:6110 voting-frontend-service

注意端口可能需要更改
