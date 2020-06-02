var GithubUser_Caches = 'my-site-cache-v2';
var urlsToCache = [
  '/Firebase/Firebase.js',
  '/Images/logo.png',
  '/Login/email.js',
  '/Login/facebook.js',
  '/Login/google.js',
  '/result_en.html',
  '/result_vi.html',
  '/result.js',
  '/home_en.html',
  '/home_vi.html',
  '/home.js',
  '/Login_en.html',
  '/Login_vi.html',
  '/index_vi.html',
  '/index.html',
  '/index.js',
  '/',];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
      caches.open(GithubUser_Caches)
        .then(function(cache) {
          console.log('Opened cache');
          return cache.addAll(urlsToCache);
        })
    );
  });

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== GithubUser_Caches) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      return response || fetch(event.request)
    
    // .then(function(response) {
    //   return caches.open(urlsToCache)
      
    // .then(function(cache) {
    //   cache.put(event.request, response.clone());
    //   return response;
    // })
    .catch(function() {
      return caches.match('/result.html');
    }); 
    // });
    })
  );
});