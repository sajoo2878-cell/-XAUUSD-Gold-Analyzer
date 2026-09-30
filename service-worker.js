self.addEventListener("install", event => {
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("push", event => {
    let data = {};

    try {
        data = event.data ? event.data.json() : {};
    } catch (e) {
        data = {
            title: "XAUUSD Signal Bot 🥇",
            body: event.data ? event.data.text() : "إشارة جديدة للذهب"
        };
    }

    const title = data.title || "XAUUSD Signal Bot 🥇";

    const options = {
        body: data.body || "إشارة جديدة متاحة",
        icon: data.icon || "/-XAUUSD-Gold-Analyzer/icon-192.png",
        badge: data.badge || "/-XAUUSD-Gold-Analyzer/icon-192.png",
        tag: data.tag || "xauusd-signal",
        renotify: true,
        requireInteraction: true,
        data: {
            url: data.url || "/-XAUUSD-Gold-Analyzer/bot.html"
        }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener("notificationclick", event => {
    event.notification.close();

    const url =
        event.notification.data?.url ||
        "/-XAUUSD-Gold-Analyzer/bot.html";

    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then(clientList => {

            for (const client of clientList) {
                if ("focus" in client) {
                    client.navigate(url);
                    return client.focus();
                }
            }

            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});