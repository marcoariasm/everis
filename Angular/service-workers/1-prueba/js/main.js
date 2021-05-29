// asegurarse que los service workers son soportados
if ('serviceWorker' in navigator){
    // console.log('Service workers supported on Chrome');
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_pages.js')
      .then(reg => console.log('Service worker: Registered'))
      .catch(err => console.log(`Service worker: Error ${err}`))
  })
}