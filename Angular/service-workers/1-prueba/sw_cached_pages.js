// llamar Install Event
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
})

// llamar Activate Event
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activated');
})