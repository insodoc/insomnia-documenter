import buildUrl from '../helpers/buildUrl';
import escape from '../helpers/escape';
import parseBody from '../helpers/parseBody';

export default function php(url, req) {
  let code = `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  `;

  const opts = [
    `CURLOPT_URL => "${buildUrl(url, req)}"`,
    'CURLOPT_RETURNTRANSFER => true',
    'CURLOPT_ENCODING => ""',
    'CURLOPT_MAXREDIRS => 10',
    'CURLOPT_TIMEOUT => 30',
    'CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1',
    `CURLOPT_CUSTOMREQUEST => "${req.method}"`
  ];

  const body = parseBody(req.body);
  if (body) {
    opts.push(`CURLOPT_POSTFIELDS => ${body}`);
  }

  if (req.cookies && req.cookies.length) {
    const cookies = [];
    req.cookies.forEach(c => cookies.push(`${encodeURIComponent(c.key)}=${encodeURIComponent(c.value)}`));
    opts.push(`CURLOPT_COOKIE => '${cookies.join('; ')}'`);
  }

  const headers = [];

  if (req.headers && req.headers.length) {
    req.headers.forEach(h => headers.push(`${h.name}: ${escape(h.value)}`));
  }

  if (req.authHeader) {
    headers.push(`'${req.authHeader.name}: ${req.authHeader.value}'`);
  }

  if (headers.length) {
    opts.push(`CURLOPT_HTTPHEADER => array(
    ${headers.join(',\n    ')}
  )`);
  }

  code += `${opts.join(',\n  ')}
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`;

  return code;
}
