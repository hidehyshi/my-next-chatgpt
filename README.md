## A-GPT with Next.js
GPTに接続するNext.jsアプリケーションです。

## 環境構築

このアプリケーションにはDockerがインストールされている前提で記載してます。

ルートフォルダにenvファイル作成する。
```bash
GPT_API_DOMAIN=GPTのドメイン
GPT_API_URL=GPTチャットAPIのURL
GPT_REFRESH_TOKEN=ご自身のシークレットトークンを記載
```

### ビルド&起動コマンド

```bash
# ビルド
docker-compose build --no-cache
# 起動
docker-compose up
```

起動したら [http://localhost:3000](http://localhost:3000) にアクセス

## 参考ドキュメント

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
