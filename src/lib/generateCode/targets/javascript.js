import buildUrl from '../helpers/buildUrl';

function parseBody(mime, body) {
  if (mime === 'application/json' && body.text) {
    return JSON.parse(body.text);
  }

  if (mime === 'application/x-www-form-urlencoded') {
    return body.params.map(p => `${encodeURIComponent(p.name)}=${encodeURIComponent(p.value)}`).join('&');
  }

  // xml to JS object conversion to be added

  return body.text;
}

export default function javascript(url, req) {
  let code = '';
  let hasForm = false;

  if (req.body && req.body.mimeType === 'multipart/form-data') {
    hasForm = true;

    code += 'const form = new FormData();\n';

    req.body.params.forEach(param => {
      code += `form.append("${param.name}", "${param.value}");\n`;
    });

    code += '\n';
  }

  code += `fetch("${buildUrl(url, req)}", `;

  const opts = {
    method: req.method
  };

  if (req.headers && req.headers.length) {
    opts.headers = {};

    req.headers.forEach(header => {
      opts.headers[header.name] = header.value;
    });
  }

  if (req.authHeader) {
    if (!opts.headers) {
      opts.headers = {};
    }

    opts.headers[req.authHeader.name] = req.authHeader.value;
  }

  if (req.cookies && req.cookies.length) {
    if (!opts.headers) {
      opts.headers = {};
    }

    opts.headers.cookie = req.cookies.map(cookie => `${encodeURIComponent(cookie.key)}=${encodeURIComponent(cookie.value)}`).join('; ');
  }

  if (!hasForm && req.body && req.body.mimeType !== 'multipart/form-data') {
    opts.body = parseBody(req.body.mimeType, req.body);
  }

  if (hasForm) {
    opts.body = '{{formVariable}}';
  }

  code += JSON.stringify(opts, null, 2);

  if (hasForm) {
    code = code.replace('"{{formVariable}}"', 'form');
  }

  code += ')\n  .then(response => console.log(response))\n';
  code += '  .catch(err => console.error(err));';

  return code;
};
