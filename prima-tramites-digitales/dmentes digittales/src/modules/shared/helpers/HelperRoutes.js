export const readUrlParams = data => {
  let params = {};
  if (data.includes('?')) {
    let urlParams = data.split('?')[1].split('&');
    for (let i = 0; i < urlParams.length; i++) {
      let pair = urlParams[i].split('=');
      params[pair[0]] = pair[0] === 'state' ? pair[1] : decodeURIComponent(pair[1]);
    }
  }
  return params;
};