const storeName = "foodsmap"

async function getDBValue(key) {
    try {
        const databases = await indexedDB.databases();
        if (!databases.some(db => db.name === "localforage"))
            return null;

        const db = await new Promise((resolve, reject) => {
            const openDB = indexedDB.open("localforage");
            openDB.onsuccess = (e) => resolve(e.target.result);
            openDB.onerror = (e) => reject(e.target.error);
        });

        if (!db.objectStoreNames.contains(storeName)) {
            return null;
        }

        return await new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, "readonly");
            const store = tx.objectStore(storeName);
            const request = key ? store.get(key) : store.getAllKeys();
            request.onsuccess = (e) => resolve(e.target.result);
            request.onerror = (e) => reject(e.target.error);
        });
    } catch {
        return null;
    }
}

self.addEventListener("install", event => {
    event.waitUntil((async () => { })())
    self.skipWaiting();

    console.debug("Service Worker Installed.");
})

self.addEventListener("activate", event => {
    clients.claim();
    event.waitUntil((async () => { })());

    console.debug("Service Worker Activated.");
});


self.addEventListener("fetch", event => {
    const request = event.request;
    // const nextUrl = request.headers.get("Next-Url");
    // const url = request.url;

    console.debug("Fetch:", request);
    return event;
    // if (!url.startsWith(location.origin)) {
    //     return event;
    // }
    // else if (request.destination === "script" && url.includes("/_next/")) {
    //     return event;
    // }
    // else if (request.destination === "" && request.cache === "reload") {
    //     // pass
    // }
    // else if (request.destination !== "document" && nextUrl === null) {
    //     return event;
    // }

    // return event.respondWith(getDBValue("access_token").then(token => {
    //     const headers = new Headers(request.headers);
    //     if (token) headers.set("Authorization", `Bearer ${token}`);

    //     return fetch(new Request(
    //         request,
    //         { headers: headers }
    //     ));
    // }).catch(() => fetch(request)));
});
