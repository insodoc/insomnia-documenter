import escape from './escape';

export default function parseBody(body) {
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
    return `"${escape(payload)}\n${boundary}--"`;
  }

  return JSON.stringify(body.text);
}
