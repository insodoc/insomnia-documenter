function parseBody(body) {
  const mime = body.mimeType;

  if (mime === 'application/x-www-form-urlencoded') {
    return `payload = ${body.params.map(p => `${encodeURIComponent(p.name)}=${encodeURIComponent(p.value)}`).join('&')}`;
  }

  if (mime === 'multipart/form-data') {
    const payload = {};
    const files = {};
    body.params.forEach(p => {
      if (p.type === 'file') {
        files[p.name] = p.value;
      } else {
        payload[p.name] = p.value;
      }
    });

    return `payload = ${JSON.stringify(payload, null, 2)}\n\nfiles = ${JSON.stringify(files, null, 2)}`;
  }

  if (mime === 'application/json' && body.text) {
    return `payload = ${JSON.stringify(JSON.parse(body.text), null, 2)}\n\nfiles = null`;
  }

  return body.text
    ? `payload = '${body.text}'\n\nfiles = null`
    : 'files = null';
}

export default function python(url, req) {
  let code = 'import requests\n\n';
  code += `url = '${url}'\n`;

  if (req.parameters && req.parameters.length) {
    const params = {};
    req.parameters.forEach(p => {
      params[p.name] = p.value;
    });
    code += `querystring = ${JSON.stringify(params)}\n`;
  }

  const headers = {};

  if (req.authHeader) {
    headers[req.authHeader.name] = req.authHeader.value;
  }

  if (req.headers && req.headers.length) {
    req.headers.forEach(h => {
      headers[h.name] = h.value;
    });
  }

  if (req.cookies && req.cookies.length) {
    headers.cookie = req.cookies.map(cookie => `${encodeURIComponent(cookie.key)}=${encodeURIComponent(cookie.value)}`).join('; ');
  }

  if (headers) {
    code += `headers = ${JSON.stringify(headers, null, 2)}\n`;
  }

  const payload = parseBody(req.body);
  if (payload) {
    code += `${payload}\n`;
  }

  code += `\nresponse = requests.request('${req.method}', url, ${payload ? 'data = payload, ' : ''}headers=headers, files=files)\n`;
  code += 'print(response.text)';

  return code;
}
