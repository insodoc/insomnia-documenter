function parseBody(body) {
  const mime = body.mimeType;

  if (mime === 'application/json' && body.text) {
    return {
      key: 'body',
      value: JSON.stringify(JSON.parse(body.text), null, 4).replace(/.$/, '  }')
    };
  }

  if (mime === 'multipart/form-data') {
    const payload = {};
    body.params.forEach(p => {
      payload[p.name] = p.value;
    });

    return {
      key: 'formData',
      value: JSON.stringify(payload, null, 4).replace(/.$/, '  }')
    };
  }

  if (mime === 'application/x-www-form-urlencoded') {
    const payload = {};
    body.params.forEach(p => {
      payload[p.name] = p.value;
    });

    return {
      key: 'form',
      value: JSON.stringify(payload, null, 4).replace(/.$/, '  }')
    };
  }

  return {
    key: 'body',
    value: JSON.stringify(body.text)
  };
}

export default function node(url, req) {
  let code = 'const request = require(\'request\');\n\n';
  let hasCookies = false;

  if (req.cookies && req.cookies.length) {
    hasCookies = true;

    code += 'const jar = request.jar();\n';

    req.cookies.forEach(cookie => {
      code += `jar.setCookie(request.cookie('${encodeURIComponent(cookie.key)}=${encodeURIComponent(cookie.value)}'), '${url}');\n`;
    });

    code += '\n';
  }

  code += 'const options = {\n  ';

  const reqOptions = [];
  reqOptions.push(`method: '${req.method}'`);
  reqOptions.push(`url: '${url}'`);

  const qs = {};
  req.parameters.forEach(p => {
    qs[p.name] = p.value;
  });

  if (Object.keys(qs).length) {
    reqOptions.push(`qs: ${JSON.stringify(qs, null, 4).replace(/.$/, '  }')}`);
  }

  const headers = {};
  req.headers.forEach(h => {
    headers[h.name] = h.value;
  });

  if (req.authHeader) {
    headers[req.authHeader.name] = req.authHeader.value;
  }

  if (Object.keys(headers).length) {
    reqOptions.push(`headers: ${JSON.stringify(headers, null, 4).replace(/.$/, '  }')}`);
  }

  if (req.body) {
    const body = parseBody(req.body);
    if (body.key && body.value) {
      reqOptions.push(`${body.key}: ${body.value}`);
    }

    if (req.body.mimeType === 'application/json') {
      reqOptions.push('json: true');
    }
  }

  if (hasCookies) {
    reqOptions.push('jar');
  }

  code += `${reqOptions.join(',\n  ')}\n};\n\n`;
  code += `request(options, (err, res, body) => {
  if (err) {
    throw new Error(err);
  }

  console.log(body);
});`;

  return code;
};
