/**
 * Check out https://googlechrome.github.io/sw-toolbox/docs/master/index.html for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'cache-v2017-05-12-17-33'
};

// remove previous cache versions
this.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {

        if (self.toolbox.options.cache != key) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json',
    'manup.js',
    './assets/fonts/ionicons.eot',
    './assets/fonts/ionicons.scss',
    './assets/fonts/ionicons.svg',
    './assets/fonts/ionicons.ttf',
    './assets/fonts/ionicons.woff',
    './assets/fonts/ionicons.woff2',
    './assets/fonts/noto-sans-bold.ttf',
    './assets/fonts/noto-sans-bold.woff',
    './assets/fonts/noto-sans-regular.ttf',
    './assets/fonts/noto-sans-regular.woff',
    './assets/fonts/noto-sans.scss',
    './assets/fonts/roboto-bold.ttf',
    './assets/fonts/roboto-bold.woff',
    './assets/fonts/roboto-bold.woff2',
    './assets/fonts/roboto-light.ttf',
    './assets/fonts/roboto-light.woff',
    './assets/fonts/roboto-light.woff2',
    './assets/fonts/roboto-medium.ttf',
    './assets/fonts/roboto-medium.woff',
    './assets/fonts/roboto-medium.woff2',
    './assets/fonts/roboto-regular.ttf',
    './assets/fonts/roboto-regular.woff',
    './assets/fonts/roboto-regular.woff2',
    './assets/fonts/roboto.scss'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;
