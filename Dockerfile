# Dockerfile
FROM node:20.11.0
 
# 作業ディレクトリ
WORKDIR /app
 
# CA証明書を追加（system-wide）
COPY .docker/certs/nscacert.pem /usr/local/share/ca-certificates/nscacert.pem
RUN update-ca-certificates
 
# Node.js の信頼ストアに反映（Node.jsはOSのCAを使う）
ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/nscacert.pem
 
# 依存関係のインストール（キャッシュ効率を良くするため先に package*.json のみコピー）
COPY package*.json ./
RUN npm install
 
# アプリ全体をコピー
COPY . .
 
# Next.js のビルド
RUN npm run build
 
# アプリを起動
EXPOSE 3000
CMD ["npm", "start"]
