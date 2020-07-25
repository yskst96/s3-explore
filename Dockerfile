FROM node:12-alpine

WORKDIR /usr/src/app

COPY ["package.json", "./"]

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]

# 実行コマンド
# docker run --rm --name s3-ex -d -p 4000:4000 --env-file .env -it s3-ex

# envファイル
# PORT=4000
# REACT_APP_KEY_ID=<AWSS3へのアクセス権限を持つAccessKeyID>
# REACT_APP_SECRET_KEY=<AWS の secret key>
# REACT_APP_BUCKET_NAME=<バケット名>