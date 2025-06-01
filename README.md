# React + Socket.IO リアルタイムチャットアプリケーション

このプロジェクトは、ReactとSocket.IOを使用したリアルタイムチャットアプリケーションです。

## 機能

- リアルタイムメッセージング
- タイピングインジケーター
- モダンなUIデザイン
- レスポンシブデザイン

## 技術スタック

- フロントエンド
  - React
  - Vite
  - Socket.IO Client
- バックエンド
  - Node.js
  - Express
  - Socket.IO

## セットアップ

1. リポジトリのクローン
```bash
git clone https://github.com/ryusei2790/socket-js.git
cd socket-js
```

2. 依存関係のインストール
```bash
npm install
```

3. アプリケーションの起動
```bash
npm start
```

これにより、バックエンドサーバー（ポート3000）とフロントエンド開発サーバー（ポート5173）が起動します。

## 開発

- `npm start` - バックエンドとフロントエンドの両方を起動
- `npm run server` - バックエンドサーバーのみを起動
- `npm run client` - フロントエンド開発サーバーのみを起動
- `npm run build` - プロダクションビルドの作成 