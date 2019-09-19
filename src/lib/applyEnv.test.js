import applyEnv from './applyEnv';
import { expect } from 'chai';

describe('applyEnv', function () {
  it('should replace env vars', function () {
    const env = {
      data: {
        url: 'http://localhost',
        method: 'GET'
      }
    };

    return expect(applyEnv('The url is {{url}} and the method is {{method}}', env)).to.eql(
      'The url is http://localhost and the method is GET'
    );
  });

  it('should handle multiple spaces correctly', function () {
    const env = {
      data: {
        foo: 'bla'
      }
    };

    return expect(applyEnv('foo is {{    foo  }}', env)).to.eql('foo is bla');
  });
});
