import { getBasicAuthHeader } from './basic';
import { expect } from 'chai';

describe('Basic authentication', function () {
  beforeEach(function () {
    global.btoa = str => Buffer.from(str).toString('base64');
  });

  describe('#getBasicAuthHeader', function () {
    it('should properly convert username:password string to base64', function () {
      const result = getBasicAuthHeader('joe', 'joe1234');
      expect(result.name).to.eql('Authorization');
      return expect(Buffer.from(result.value, 'base64').toString()).to.eql('joe:joe1234');
    });

    it('should not encode username if not provided', function () {
      const result = getBasicAuthHeader(null, 'joe1234');
      return expect(Buffer.from(result.value, 'base64').toString()).to.eql(':joe1234');
    });

    it('should not encode password if not provided', function () {
      const result = getBasicAuthHeader('joe');
      return expect(Buffer.from(result.value, 'base64').toString()).to.eql('joe:');
    });
  });
});
