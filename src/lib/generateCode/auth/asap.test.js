import { getASAPHeader } from './asap';
import { expect } from 'chai';

describe('ASAP authentication', function () {
  describe('#getASAPHeader', function () {
    return expect(getASAPHeader()).to.eql({
      name: 'Authorization',
      value: 'Bearer {{jwt_token}}'
    });
  });
});
