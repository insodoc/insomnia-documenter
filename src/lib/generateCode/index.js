import generateAuthHeader from './auth';

import curl from './targets/curl';
import javascript from './targets/javascript';
import python from './targets/python';

class CodeGenerator {
  constructor(request, url, cookiejars) {
    this.request = request;
    this.url = url;
    this.cookiejars = cookiejars;

    this.request.cookies = this.appendCookies();

    if (this.request.authentication && this.request.authentication.type) {
      this.request.authHeader = generateAuthHeader(this.request.authentication);
    }
  }

  generate(language) {
    switch (language) {
      case 'curl':
        return curl(this.url, this.request);
      case 'javascript':
        return javascript(this.url, this.request);
      case 'python':
        return python(this.url, this.request);
      default:
        return 'Not implemented yet...';
    }
  }

  appendCookies() {
    const cookies = [];

    this.cookiejars.forEach(jar => {
      if (!jar.cookies || !jar.cookies.length) {
        return;
      }

      jar.cookies.forEach(cookie => {
        if (this.url.includes(cookie.domain) && (cookie.path === '/' || this.url.includes(cookie.path))) {
          cookies.push({
            key: cookie.key,
            value: cookie.value
          });
        }
      });
    });

    return cookies;
  }
};

export default (request, url, language, cookiejars) => new CodeGenerator(request, url, cookiejars).generate(language);
