import { getBearerAuthHeader } from './bearer';
import { expect } from 'chai';

describe('Bearer authentication', function () {
  describe('#getBearerAuthHeader', function () {
    it('should return bearer with token', function () {
      return expect(getBearerAuthHeader('my token')).to.eql({
        name: 'Authorization',
        value: 'Bearer my token'
      });
    });
  });
});
