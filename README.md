# Voting-Docker
Docker打包

在/database目录运行

docker build -t postgres-container .

docker run -d --name postgres-instance --env-file .env postgres-container


在/backend目录运行

docker build -t voting-backend-service .

docker run -p 8000:8000 voting-backend-service


在/frontend目录运行

docker build -t voting-frontend-service .

docker run -p 6110:6110 voting-frontend-service

