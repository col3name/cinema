export const updateURLParameter = (url: string, key: string, value: string) => {
  let newAdditionalURL = '';
  let tempArray = url.split('?');
  let baseURL = tempArray[0];
  let additionalURL = tempArray[1];
  let temp = '';
  if (additionalURL) {
    tempArray = additionalURL.split('&');
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split('=')[0] != key) {
        newAdditionalURL += temp + tempArray[i];
        temp = '&';
      }
    }
  }

  return baseURL + '?' + newAdditionalURL + temp + '' + key + '=' + value;
}

export const replaceUrlParam = (key: string, value: string) => {
  window.history.replaceState('', '', updateURLParameter(window.location.href, key, value));
}

export const getUrlParameter = (key: string) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(key) || '';
};