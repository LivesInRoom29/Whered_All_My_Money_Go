// set up this array ahead of time to use below
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/index.js",
  "/dist/manifest.json",
  // cache the bundles generated by webpack
  "/dist/bundle.js",
  //Bootstrap
  "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
  //chartJs
  "https://cdn.jsdelivr.net/npm/chart.js@2.8.0",
];

const CACHE_NAME = "static-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";

// hook to the install event
// this is the code that runs when you install it
self.addEventListener("install", function(event) {
  // wait until we open the cache, then pre cache transaction data
  event.waitUntil(
    caches.open(DATA_CACHE_NAME)
      .then((cache) => cache.add("/api/transaction"))
  );

  // wait until we open the cache, then add the statice files to the cache
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log("Your files were pre-cached successfully!");
        return cache.addAll(FILES_TO_CACHE);
      })
  );

  // tell the browser to activate this service worker immediately once it has finished installing
  // lets the app keep going while files are being cached
  self.skipWaiting();
});

// checks to see if we have values in the cache
//activate -- invalidate the cache or serve it back
self.addEventListener("activate", function(event) {
  const currentCaches = [CACHE_NAME, DATA_CACHE_NAME];
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        // return array of cache names that are old to delete
        return cacheNames.filter(
          cacheName => !currentCaches.includes(cacheName)
        );
      })
      .then(cachesToDelete => {
        return Promise.all(
          cachesToDelete.map(cacheToDelete => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
      .catch(err => console.log(err))
  );
});

self.addEventListener("fetch", function(event) {
  // non GET requests are not cached and requests to other origins are not cached
  if (
    event.request.method !== "GET" ||
    !event.request.url.startsWith(self.location.origin)
  ) {
      event.respondWith(fetch(event.request));
    return;
  }

  // cache successful requests to the API
  // whenever a fetch call is made, checks to see if the req contains /api/
  // if we are online, we want to read the data from the db
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      // use data_cache (separate from app cache)
      caches.open(DATA_CACHE_NAME).then(cache => {
        // if we get data back, will serve that up
        return fetch(event.request)
          .then(response => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
              cache.put(event.request.url, response.clone());
            }
            return response;
          })
          .catch(err => {
            // Network request failed, try to get it from the cache.
            return cache.match(event.request);
          });
      }).catch(err => console.log(err))
    );

    return;
  }

  // if the request is not for the API, serve static assets using "offline-first" approach.
  // see https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-falling-back-to-network
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});