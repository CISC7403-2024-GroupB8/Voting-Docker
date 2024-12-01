# Voting-Docker

GitHub 倉庫鏈接：[https://github.com/CISC7403-2024-GroupB8/Voting-Docker](https://github.com/CISC7403-2024-GroupB8/Voting-Docker)

## 一鍵運行數據庫+後端的 container

Windows 使用 `docker-compose up --build`
Mac 使用 `docker compose up --build`

通過瀏覽器進入 [http://localhost:6110](http://localhost:6110) 訪問投票頁；
進入 [http://localhost:6111](http://localhost:6111) 訪問結果展示頁；

## 分開調試測試

### 在 `/database` 目录运行

docker build -t postgres-container .

docker run -d --name postgres-instance -p 5432:5432 --env-file .env postgres-container

### 在 `/backend` 目录运行

docker build -t voting-backend-service .

docker run -d --name voting-backend-service -p 8000:8000 voting-backend-service

### 在 `/frontend` 目录运行

docker build -t voting-frontend-service .

docker run -p 6110:6110 voting-frontend-service

注意端口可能需要更改
