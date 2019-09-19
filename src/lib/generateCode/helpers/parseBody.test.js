import parseBody from './parseBody';
import { expect } from 'chai';

describe('parseBody', function () {
  it('should parse urlencoded', function () {
    const body = {
      mimeType: 'application/x-www-form-urlencoded',
      params: [
        { name: 'insomnia', value: 'is awesome' },
        { name: 'roses', value: 'are red' }
      ]
    };

    return expect(parseBody(body)).to.eql(
      'insomnia=is%20awesome&roses=are%20red'
    );
  });

  it('should parse formdata', function () {
    const body = {
      mimeType: 'multipart/form-data',
      params: [
        { name: 'insomnia', value: 'is awesome' },
        { name: 'roses', value: 'are red' }
      ]
    };

    const result = `"-----011000010111000001101001
Content-Disposition: form-data; name=\\"insomnia\\"

is awesome
-----011000010111000001101001
Content-Disposition: form-data; name=\\"roses\\"

are red`.split('\n').join('\\n') + '\n-----011000010111000001101001--"';

    return expect(parseBody(body)).to.eql(result);
  });

  it('should return plain body for everything else', function () {
    return expect(parseBody({ mimeType: 'text/plain', text: 'hello world' })).to.eql(
      '"hello world"'
    );
  });
});
