import escape from '../helpers/escape';

function parseBody(body) {
  const mime = body.mimeType;

  if (mime === 'application/x-www-form-urlencoded') {
    return body.params.map(p => `${encodeURIComponent(p.name)}=${encodeURIComponent(p.value)}`).join('&');
  }

  if (mime === 'multipart/form-data') {
    const boundary = '-----011000010111000001101001'; // api :)
    const payload = body.params.map(p => {
      return `${boundary}
Content-Disposition: form-data; name="${p.name}"

${p.value}`;
    }).join('\n');
    return `${escape(payload)}\n${boundary}--`;
  }

  if (mime === 'application/json' && body.text) {
    return JSON.stringify(JSON.parse(body.text), null, 2);
  }

  return body.text;
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
    code += `headers = ${JSON.stringify(headers, null, 4)}\n`;
  }

  const payload = parseBody(req.body);
  if (payload) {
    code += `payload = '${payload}'\n`;
  }

  code += `\nresponse = requests.request('${req.method}', url, data=payload, headers=headers)\n`;
  code += 'print(response.text)';

  return code;
}
