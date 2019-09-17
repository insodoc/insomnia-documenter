import buildUrl from '../helpers/buildUrl';
import escape from '../helpers/escape';

export default function curl(url, req) {
  let code = `curl --request ${req.method} \\\n`;
  code += `  --url ${buildUrl(url, req)} \\\n`;
  req.headers.forEach(header => {
    code += `  --header '${header.name}: ${header.value}' \\\n`;
  });

  if (req.authHeader) {
    code += `  --header '${req.authHeader.name}: ${escape(req.authHeader.value)}' \\\n`;
  }

  if (req.cookies && req.cookies.length) {
    req.cookies.forEach(cookie => {
      code += `  --cookie '${cookie.key}'='${cookie.value}' \\\n`;
    });
  }

  if (req.body && req.body.params && req.body.params.length) {
    req.body.params.forEach(param => {
      code += `  --form '${param.name}=${param.value}' \\\n`;
    });
  }

  if (req.body && req.body.text) {
    code += `  --data '${req.body.text.replace(/\t/g, '  ')}' \\\n`;
  }

  return code.slice(0, -2);
};
