# 使用PostgreSQL的官方镜像作为基础
FROM postgres:latest

# 复制初始化SQL脚本到容器中
COPY ./init.sql /docker-entrypoint-initdb.d/

# 暴露PostgreSQL默认端口
EXPOSE 5432
