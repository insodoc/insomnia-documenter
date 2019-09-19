import buildUrl from '../helpers/buildUrl';
import parseBody from '../helpers/parseBody';

function getMethod(method) {
  switch (method) {
    case 'GET':
      return 'Get';
    case 'POST':
      return 'Post';
    case 'PATCH':
      return 'Patch';
    case 'PUT':
      return 'Put';
    case 'DELETE':
      return 'Delete';
    default:
      return '{{METHOD}}';
  }
}

export default function ruby(url, req) {
  url = buildUrl(url, req);
  const isHTTPS = url.startsWith('https://');

  let code = "require 'uri'\nrequire 'net/http'\n";

  if (isHTTPS) {
    code += "require 'openssl'\n";
  }

  code += `\nurl = URI("${url}")\n\nhttp = Net::HTTP.new(url.host, url.port)\n`;

  if (isHTTPS) {
    code += 'http.use_ssl = true\nhttp.verify_mode = OpenSSL::SSL::VERIFY_NONE\n';
  }

  code += `\nrequest = Net::HTTP::${getMethod(req.method)}.new(url)\n`;

  if (req.cookies && req.cookies.length) {
    const cookies = [];
    req.cookies.forEach(c => cookies.push(`${encodeURIComponent(c.key)}=${encodeURIComponent(c.value)}`));
    code += `request["cookie"] = '${cookies.join('; ')}'\n`;
  }

  if (req.headers && req.headers.length) {
    req.headers.forEach(header => {
      code += `request["${header.name}"] = ${JSON.stringify(header.value)}\n`;
    });
  }

  if (req.authHeader) {
    code += `request["${req.authHeader.name}"] = ${JSON.stringify(req.authHeader.value)}\n`;
  }

  if (req.body) {
    const body = parseBody(req.body);

    if (body) {
      code += `request.body = ${body}\n`;
    }
  }

  code += '\nresponse = http.request(request)\nputs response.read_body';

  return code;
}
