エクスプローラビューで S3 を参照するアプリ

## 機能

- ファイル参照
- ファイルアップロード
- ファイルダウンロード
- ファイル削除
- コンテナ化

## 使い方

以下の環境変数を定義した.env ファイルを PRJ ルートに作成し、アプリを実行(npm run build, npm run start)する
コンテナとして実行する場合は Dockerfile のコメント参照。イメージは dockerhub にプッシュしていないので自前で build する必要がある。
**どこかにホスティングしてインターネット公開しないよう注意**

- PORT:ポート(4000)
- REACT_APP_KEY_ID:AWS の AccessKeyID
- REACT_APP_SECRET_KEY:AWS の secret key S3 へのアクセス権限が必要
- REACT_APP_BUCKET_NAME:S3 バケット名
