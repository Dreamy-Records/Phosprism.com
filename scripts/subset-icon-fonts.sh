#!/bin/sh
# サイトで使う Font Awesome のアイコンだけを含むフォントを src/fonts/ に作り直す。
# 必要なもの: pip install fonttools brotli
# アイコンを追加したら、下の一覧にコード（all.css の --fa の値）を足して実行する。
set -eu

webfonts=node_modules/@fortawesome/fontawesome-free/webfonts

solid=U+f060,U+f061,U+e09a,U+f08e,U+f019,U+f002,U+f1d8,U+f2ea,U+f1de,U+f00d
regular=U+f0c5
brands=U+f392,U+e61b,U+f167

pyftsubset "$webfonts/fa-solid-900.woff2" --unicodes="$solid" --flavor=woff2 \
  --output-file=src/fonts/fa-solid-subset.woff2
pyftsubset "$webfonts/fa-regular-400.woff2" --unicodes="$regular" --flavor=woff2 \
  --output-file=src/fonts/fa-regular-subset.woff2
pyftsubset "$webfonts/fa-brands-400.woff2" --unicodes="$brands" --flavor=woff2 \
  --output-file=src/fonts/fa-brands-subset.woff2

echo "src/fonts/ のアイコンフォントを更新しました。"
