const CACHE_NAME = 'offline';

const isUrlInCacheWhitelist = (url: string) => {
    const ALLOWED_DOMAINS = [
        '127.0.0.1:8000',
        'localhost:8000',
        'fonts.googleapis.com',
        'tile.openstreetmap.org',
        'nominatim.openstreetmap.org',
        'www.openstreetmap.org'
    ];

    const urlObject = new URL(url);
    return ALLOWED_DOMAINS.includes(urlObject.host);
}

self.addEventListener('install', (event: ExtendableEvent) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
    )
})

self.addEventListener('fetch', (event: FetchEvent) => {
    const needToCache = isUrlInCacheWhitelist(event.request.url);
    event.respondWith(
        fetch(event.request).then((response) => {
            if (!needToCache) {
                return response;
            }
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
                cache.delete(event.request)
                cache.put(event.request, responseClone)
            })
            return response
        }).catch(() => {
            if (!needToCache) {
                return new Response(null, { status: 404, statusText: 'Not Found' });
            }
            return caches.match(event.request).then((cachedResponse) => cachedResponse || new Response(null, { status: 404, statusText: 'Not Found' }));
        })
    )
})