# Phos'Prism Website

[Phos'Prism](https://phosprism.com) の公式サイトです。Astroで静的サイトとして生成し、ニュース、音楽作品、メンバー、イベント、メディア、ショップ、お問い合わせ情報を提供しています。

## サイト内容

- **ABOUT** — サークル紹介・活動方針
- **NEWS** — Markdownで管理するお知らせ、検索・年・カテゴリー絞り込み、ページネーション
- **MEMBERS** — メンバー一覧と個別プロフィール
- **MUSIC** — 作品一覧、カバーフロー / リスト表示の切り替え
- **EVENTS** — 参加予定・参加済みイベント
- **SHOP** — 取扱ショップ
- **MEDIA** — XFD、MV、壁紙
- **CONTACT** — SSGFormとCloudflare Turnstileを利用したお問い合わせフォーム
- **RSS / Sitemap / Privacy Policy** — フッターから利用可能な補助ページ

## 技術スタック

| 分類           | 使用技術                                    |
| -------------- | ------------------------------------------- |
| フレームワーク | [Astro](https://astro.build/) 5（静的出力） |
| 言語           | TypeScript / Astro / CSS                    |
| コンテンツ管理 | Astro Content Collections + Markdown        |
| アニメーション | [GSAP](https://gsap.com/)                   |
| アイコン       | Font Awesome                                |
| RSS            | `@astrojs/rss`                              |
| 画像最適化     | Astro `astro:assets`（WebP + フォールバック） |
| アクセス解析   | Google Analytics 4                          |
| テスト環境     | Cloudflare Pages                            |
| 本番環境       | SSH + rsync                                 |
| CI/CD          | GitHub Actions                              |

## ローカル開発

### 必要環境

- Node.js 24 LTS 推奨
- npm

### セットアップ

```bash
npm install
```

### コマンド

```bash
# 開発サーバー（http://localhost:4321）
npm run dev

# 本番用の静的ファイルを dist/ に出力
npm run build

# ビルド結果をローカルで確認
npm run preview

# コード整形 / 整形チェック
npm run format
npm run format:check
```

`dist/index.html`を直接開くのではなく、`npm run preview`などのWebサーバー経由で確認してください。

## コンテンツと自動生成

### ニュース記事

ニュースは`src/content/news/`以下のMarkdownファイルで管理します。

```yaml
---
title: '新作のお知らせ'
date: 2026-09-25
category: 'RELEASE'
description: 'OGPとRSSに表示する概要です。' # 任意
slug: 'new-release' # 任意
image: '/assets/news/new-release.jpg' # 任意
showImage: false # 任意
redirectTo: 'https://example.com/' # 任意
---
```

| 項目        | 自動処理                                                                      |
| ----------- | ----------------------------------------------------------------------------- |
| 記事URL     | `slug`未指定時はファイル名を使用。例: `post-145.md` → `/news/post-145/`       |
| description | 未指定時は本文の先頭から最大120文字を生成し、meta description・OGP・RSSに使用 |
| OGP画像     | `image`未指定時は共通OGP画像を使用                                            |
| RSS         | `npm run build`時に全記事を`/rss`へ自動出力                                   |
| 一覧        | 公開日の降順で並べ、10記事ごとにページネーションを生成                        |
| 外部リンク  | `redirectTo`を指定すると、ニュース一覧から指定URLへ遷移                       |

`slug`や`description`を指定した場合は、手動設定が常に優先されます。公開済み記事のファイル名を変更するとURLも変わるため、変更しないでください。

### 旧WordPress記事の移行・転送

WordPress記事はMarkdownへ移行済みです。旧URLから新しいニュース記事へは、次のファイルで転送を管理しています。

- `src/data/legacyRedirects.ts` — Astroの旧URL転送
- `public/_redirects` — 静的ホスティング向け転送ルール
- `scripts/migrate-wordpress.mjs` — WordPress記事移行用スクリプト

### 画像の自動最適化

`public/assets/` に置いた PNG / JPEG / WebP / AVIF は、`npm run build` の直前に
Astro画像最適化用の作業ディレクトリへ自動同期されます。共通の `OptimizedImage`
コンポーネントを使うページでは、表示幅に合う複数サイズのWebPを生成して優先配信します。

WebPに対応しない古いブラウザには、同じ画像から生成した PNG / JPEG のフォールバックを
`<img>` として返します。画像の追加はこれまでどおり `public/assets/` に置くだけで構いません。

## デプロイ

`.github/workflows/deploy.yml` がpushを検知して、ビルドとデプロイを実行します。

| ブランチ  | ビルド環境              | デプロイ先                                            |
| --------- | ----------------------- | ----------------------------------------------------- |
| `staging` | `DEPLOY_ENV=staging`    | Cloudflare Pages（`https://test.phosprism.com`） |
| `main`    | `DEPLOY_ENV=production` | 本番サーバー（SSH + rsync）                           |

### 基本フロー

1. `staging`で実装・確認する
2. GitHub Actionsでテスト環境へのデプロイ成功を確認する
3. `staging`を`main`へマージする
4. GitHub Actionsが本番用ビルドを実行し、`dist/`の中身を本番公開ディレクトリへ同期する

### GitHub Secrets / Variables

テスト環境のCloudflare Pagesデプロイには以下を利用します。

- `CLOUDFLARE_API_TOKEN`（Secret）
- `CLOUDFLARE_ACCOUNT_ID`（Secret）
- `CLOUDFLARE_PAGES_PROJECT`（Repository Variable）

本番デプロイには以下を利用します。

- `SSH_HOST`
- `SSH_USER`
- `SSH_PORT`
- `SSH_PRIVATE_KEY`
- `PRODUCTION_PATH`

これらの値はGitHub Secretsへ登録し、リポジトリやソースコードには含めません。

## アクセス解析

Google アナリティクスのタグを共通レイアウトで読み込んでいます。本番環境のみで有効化され、テスト環境では送信されません。タグIDは`GTM-T9TMRZ4G`です。

## 主な構成

```text
src/
├── components/       # ニュース一覧などの共通コンポーネント
├── content/news/     # Markdownニュース記事
├── data/             # メンバー情報・旧URL転送データ
├── layouts/          # 共通ヘッダー、フッター、OGP、GA設定
├── pages/            # 各ページとRSSエンドポイント
├── styles/           # グローバルスタイル
└── utils/            # ニュースURL・description自動生成

public/
├── assets/           # ロゴ、画像、音源ジャケット、壁紙など
└── _redirects        # 静的ホスティング用リダイレクト

.github/workflows/
└── deploy.yml        # テスト・本番自動デプロイ
```

## 運用上の注意

SSH鍵、Cloudflare APIトークン、フォーム連携用のシークレットなど、認証情報はリポジトリへ含めません。GitHub Secretsまたは各サービスの管理画面で安全に管理してください。
