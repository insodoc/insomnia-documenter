import generateAuthHeader from '.';
import { expect } from 'chai';

describe('generateAuthHeader', function () {
  it('should return default header for unknown values', function () {
    return expect(generateAuthHeader('lemons')).to.eql({
      name: 'Authorization',
      value: '{{authorization}}'
    });
  });
});
