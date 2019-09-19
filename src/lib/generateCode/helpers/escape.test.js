import escape from './escape';
import { expect } from 'chai';

describe('escape', function () {
  it('should escape string', function () {
    return expect(escape('this is a "string" haha')).to.eql('this is a \\"string\\" haha');
  });
});
