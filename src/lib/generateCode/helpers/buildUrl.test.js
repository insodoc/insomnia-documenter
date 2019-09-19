import buildUrl from './buildUrl';
import { expect } from 'chai';

describe('buildUrl', function () {
  it('should handle urls without params', function () {
    return expect(buildUrl('http://localhost', {})).to.eql('http://localhost');
  });

  it('should return url with encoded params', function () {
    return expect(buildUrl('http://localhost', {
      parameters: [
        { name: 'insomnia', value: 'is awesome' }
      ]
    })).to.eql('http://localhost?insomnia=is%20awesome');
  });
});
