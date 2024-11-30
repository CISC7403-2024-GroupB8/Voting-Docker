# Getting Started with Create React App

## 啟動 docker

打包投票頁
`docker build -f Dockerfile.vote -t vote-app .`
`docker run -p 6110:6110 --name vote-web-container vote-app`

打包結果頁
`docker build -f Dockerfile.result -t result-app .`
`docker run -p 6111:6111 --name result-web-container result-app`

## Available Scripts

In the project directory, you can run:

### `npm i`

安裝所有需要的庫

### `npm start`

特別的，Windows 需要使用`set PORT=6110 && npm start`啟動，Linux 使用`PORT=6110 && npm start`。
修改上面的端口，6110 投票頁，6111 結果頁。
代碼中已自動判斷目前端口，需正確設置。

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
