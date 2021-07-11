export default function parseUrlWithParams(url, req) {
  const params = req.parameters;

  if (!params || !params.length) {
    return url;
  }

  url = `${url}?`;

  url += params.filter(param => !param.disabled).map(param => {
    return `${encodeURIComponent(param.name)}=${encodeURIComponent(param.value)}`;
  }).join('&');

  return url;
};
