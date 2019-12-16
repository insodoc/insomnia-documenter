import buildRequest from './buildRequest';
import { expect } from 'chai';

describe('buildRequest', function () {
  beforeEach(function () {
    this.dummy = {
      _id: 'req_e461221fe0d447849464656407fed9a6',
      method: 'GET',
      name: 'Test request',
      description: null,
      parameters: null,
      url: 'http://localhost',
      authentication: null,
      body: null,
      headers: null,
      _type: 'request'
    };
  });

  it('should return original request data if description is null', function () {
    return expect(buildRequest(this.dummy)).to.deep.eql(this.dummy);
  });

  it('should not return example if tags not present', function () {
    const dummy = { ...this.dummy, description: 'Hello world' };
    const request = buildRequest(dummy);

    expect(request.exampleResponse).to.be.null;
    return expect(request.description).to.eql(dummy.description);
  });

  it('should separate example from description if tags present', function () {
    const description = `This is an example:
<!-- RESPONSE -->
plaintext
<!-- ENDRESPONSE -->
more text`;
    const dummy = { ...this.dummy, description };

    const request = buildRequest(dummy);

    expect(request.description).to.not.include(`<!-- RESPONSE -->
plaintext
<!-- ENDRESPONSE -->`);
    return expect(request.exampleResponse).to.eql('plaintext');
  });
});
