import buildUrl from '../helpers/buildUrl';

function parseBody(body) {
  const mime = body.mimeType;

  if (mime === 'application/x-www-form-urlencoded') {
    return '"' + body.params.map(p => `${encodeURIComponent(p.name)}=${encodeURIComponent(p.value)}`).join('&') + '"';
  }

  if (mime === 'multipart/form-data') {
    const boundary = '-----011000010111000001101001'; // api :)
    const payload = body.params.map(p => {
      return `${boundary}
Content-Disposition: form-data; name="${p.name}"

${p.value}`;
    }).join('\n');
    return `"${escape(payload)}\n${boundary}--"`;
  }

  return JSON.stringify(body.text);
}

export default function golang(url, req) {
  const body = req.body && parseBody(req.body);

  let code = `package main

import (
  "fmt"${body ? '\n"strings"' : ''}
  "net/http"
  "io/ioutil"
)

func main() {

  `;

  code += `url := "${buildUrl(url, req)}"\n`;

  if (body) {
    code += `  payload := strings.NewReader(${body})\n`;
  }

  code += `  req, _ := http.NewRequest("${req.method}" url, ${body ? 'payload' : 'nil'})\n\n`;

  if (req.cookies && req.cookies.length) {
    const cookies = [];
    req.cookies.forEach(c => cookies.push(`${encodeURIComponent(c.key)}=${encodeURIComponent(c.value)}`));
    code += `  req.Header.Add("cookie", ${JSON.stringify(cookies.join(';'))})\n`;
  }

  req.headers.forEach(h => {
    code += `  req.Header.Add("${h.name}", ${JSON.stringify(h.value)})\n`;
  });

  if (req.authHeader) {
    code += `  req.Header.Add("${req.authHeader.name}", ${JSON.stringify(req.authHeader.value)})\n`;
  }

  code += `  res, _ := http.DefaultClient.Do(req)

  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)

  fmt.Println(res)
  fmt.Println(string(body))

}`;

  return code;
}
