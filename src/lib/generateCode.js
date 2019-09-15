class CodeGenerator {
  constructor(request, url) {
    this.request = request;
    this.url = url;
    this.mime = request.body && request.body.mimeType;
  }

  parseUrlWithParams() {
    let url = this.url;
    const params = this.request.parameters;

    if (!params || !params.length) {
      return url;
    }

    url = `${url}?`;

    params.forEach(param => {
      url += `${encodeURIComponent(param.name)}=${encodeURIComponent(param.value)}`;
    });

    return url;
  }

  curl() {
    let code = `curl --request ${this.request.method} \\\n`;
    code += `  --url ${this.parseUrlWithParams()} \\\n`;
    this.request.headers.forEach(header => {
      code += `  --header '${header.name}: ${header.value}' \\\n`;
    });

    // authorization logic coming soon

    if (this.request.body && this.request.body.params && this.request.body.params.length) {
      this.request.body.params.forEach(param => {
        code += `  --form '${param.name}=${param.value}' \\\n`;
      });
    }

    if (this.request.body && this.request.body.text) {
      code += `  --data '${this.request.body.text}' \\\n`;
    }

    return code.slice(0, -2);
  }

  generate(language) {
    switch (language) {
      case 'curl':
        return this.curl();
      default:
        return 'Not implemented yet...';
    }
  }
};

export default (request, url, language) => new CodeGenerator(request, url).generate(language);
