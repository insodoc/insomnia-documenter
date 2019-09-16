export default function parseUrlWithParams(url, req) {
  const params = req.parameters;

  if (!params || !params.length) {
    return url;
  }

  url = `${url}?`;

  params.forEach(param => {
    url += `${encodeURIComponent(param.name)}=${encodeURIComponent(param.value)}`;
  });

  return url;
};
