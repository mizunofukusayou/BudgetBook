const CACHE_NAME = 'kakeibo-v3';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './main.js',
    './manifest.json',
    'icon-120.png'
];

// インストール時にファイルをキャッシュ
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// オフライン時はキャッシュからデータを返す
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// アクティベート
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// 古いバージョンのキャッシュを削除
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (CACHE_NAME !== cacheName) {
                        return caches.delete(cacheName); 
                    }
                })
            );
        })
    );
});