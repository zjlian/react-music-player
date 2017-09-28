//往字符串url后面添加get请求的参数

function addUrlParam(url, name, value) {
  url += (url.indexOf('?') === -1 ? '?' : '&');
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
  return url;
}

export default addUrlParam;