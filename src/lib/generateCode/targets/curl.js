import buildUrl from '../helpers/buildUrl';
import escape from '../helpers/escape';

export default function curl(url, req) {
  let code = `curl "${buildUrl(url, req)}" \\\n`;

  req.headers.forEach(header => {
    code += `  -H '${header.name}: ${header.value || ''}' \\\n`;
  });

  if (req.authHeader) {
    code += `  -H '${req.authHeader.name}: ${escape(req.authHeader.value || '')}' \\\n`;
  }

  code += `  -X ${req.method} \\\n`;

  if (req.cookies && req.cookies.length) {
    req.cookies.forEach(cookie => {
      code += `  -b '${cookie.key}'='${cookie.value}' \\\n`;
    });
  }

  if (req.body && req.body.params && req.body.params.length) {
    req.body.params.forEach(param => {
      if (param.value === null) {
        return false;
      }

      if (param.value.indexOf('\'') >= 0 && param.value.indexOf('"') >= 0) {
        code += `  -F "${param.name}=${param.value.replace('"', '\\"')}"`;
      } else if (param.value.indexOf('\'') >= 0) {
        code += `  -F "${param.name}=${param.value}"`;
      } else if (param.value.indexOf('"') >= 0) {
        code += `  -F '${param.name}=${param.value}'`;
      } else {
        code += `  -F '${param.name}=${param.value}'`;
      }
      code += ' \\\n';
    });
  }

  if (req.body && req.body.text) {
    code += `  -d '${req.body.text.replace(/\t/g, '  ')}' \\\n`;
  }

  return code.slice(0, -2);
};
