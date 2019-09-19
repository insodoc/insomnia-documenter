import { getHawkAuthHeader } from './hawk';
import { expect } from 'chai';

describe('Hawk authentication', function () {
  describe('#getHawkAuthHeader', function () {
    it('should return proper hawk string', function () {
      return expect(getHawkAuthHeader('my_id')).to.eql({
        name: 'Authorization',
        value: 'Hawk id="my_id", ts="1103493600", nonce="{{hawk_nonce}}", mac="{{hawk_mac}}"'
      });
    });
  });
});
