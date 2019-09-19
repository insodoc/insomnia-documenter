export default function parseUrlWithParams(url, req) {
  const params = req.parameters;

  if (!params || !params.length) {
    return url;
  }

  url = `${url}?`;

  url += params.map(param => {
    return `${encodeURIComponent(param.name)}=${encodeURIComponent(param.value)}`;
  }).join('&');

  return url;
};
