# PWAアプリの基本ファイル構成

```
my-pwa-app/
├── index.html          (アプリの画面・骨組み)
├── style.css           (デザイン・見た目)
├── main.js             (ボタンを押した時の動き・設定)
├── sw.js               (サービスワーカー：オフライン対応の要)
├── manifest.json       (アプリの設定ファイル：アイコンや名前)
└── icons/              (アプリアイコン画像を入れるフォルダ)
    ├── icon-120.png
    ├── icon-180.png
    └── icon-1024.png
```

| ファイル名 | 役割 | 初心者向けの例え |
| --- | --- | --- |
| index.html | アプリの「本体」。文字、入力欄、ボタンなどを配置します。 | 建物の構造（壁やドア） |
| style.css | アプリの色、サイズ、配置などのデザインを整えます。 | 内装・外装（ペンキ塗り） |
| main.js | 計算や保存などのプログラムを書きます。また、sw.jsを登録する役割も持ちます。 | 家電や設備の動き |
| sw.js | Service Worker（サービスワーカー）。ネットがなくてもアプリが開くように、裏側でデータを管理します。 | 管理人室（在庫の備蓄） |
| manifest.json | 「これはアプリです」とスマホに伝えるための設定書。アイコン画像や起動時の色を指定します。 | 身分証明書・設計図 |
| icons/ | iPhoneのホーム画面に表示されるアイコン画像です。最低2サイズ必要です。 | 看板のロゴ |



# manifest.jsonの基本構成例
|項目名|説明|
|---|---|
|name|アプリの正式名称。インストール時などに表示されます。|
|short_name|ホーム画面のアイコン下に表示される短い名前。|
|start_url|アプリ起動時に最初に読み込むURL（通常は index.html）。|
|display|表示モード。standalone（ブラウザのUIを隠す）が一般的です。|
|background_color|スプラッシュ画面（起動画面）の背景色。|
|theme_color|ブラウザのツールバーなどの色。|
|icons|アイコン画像の配列。サイズ（192x192, 512x512等）ごとに指定します。|



```json:manifest.json
{
    "name": "家計簿アプリ",
    "start_url": "/index.html",
    "display": "standalone",
    "background_color": "#000000",
    "theme_color": "#6495ed",
    "icons": [
        {
        "src": "icons/icon-120.png",
        "sizes": "120x120",
        "type": "image/png"
        },
        {
        "src": "icons/icon-180.png",
        "sizes": "180x180",
        "type": "image/png"
        },
        {
        "src": "icons/icon-1024.png",
        "sizes": "1024x1024",
        "type": "image/png"
        }
    ]
}
```

```html:index.html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>家計簿アプリ</title>
    <link rel="shortcut icon" href="manifest.json">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>あなたの家計を管理します</h1>
    <p>believe me</p>
    <div class="form-container">
        <form action="#">
            <div class="form-group">
                <label for="name">お名前</label>
                <input type="text" id="name" name="name" placeholder="山田 太郎" required>
            </div>

            <div class="form-group">
                <label for="email">メールアドレス</label>
                <input type="email" id="email" name="email" placeholder="example@mail.com" required>
            </div>

            <div class="form-group">
                <label for="note">メモ</label>
                <textarea id="note" name="note" placeholder="こちらにご記入ください"></textarea>
            </div>

            <button type="submit" class="submit-btn">送信する</button>
        </form>
    </div>
</body>
</html>
```

```css:style.css
@charset "UTF-8";

:root {
    /* 変数の定義（デフォルトはライト用） */
    --main-bg: #f8f9fa;
    --main-text: #121212;
}

@media (prefers-color-scheme: dark) {
    :root {
    /* ダークモードの時だけ、変数の中身を入れ替える */
    --main-bg: #121212;
    --main-text: #f8f9fa;
    }
}

body {
    background-color: var(--main-bg);
    color: var(--main-text);
}
```