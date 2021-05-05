import { expect } from 'chai';
import buildRequest from './buildRequest';

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
      _type: 'request',
    };
  });

  it('should return original request data if description is null', function () {
    return expect(buildRequest(this.dummy)).to.deep.eql(this.dummy);
  });

  describe('example responses', function () {
    beforeEach(function () {
      const description = `This is an example:
\`\`\`response
  no status code
\`\`\`

more text goes here

\`\`\`response:200
response 200
\`\`\`

even more text

\`\`\`response:404
  response 404
\`\`\``;

      this.exampleResponseDummy = { ...this.dummy, description };
    });

    it('should not return example if tags not present', function () {
      const dummy = { ...this.dummy, description: 'Hello world' };
      const request = buildRequest(dummy);

      expect(request.exampleResponses).to.have.length(0);
      return expect(request.description).to.eql(dummy.description);
    });

    it('should extract example responses, regardless of tag spacing', function () {
      const request = buildRequest(this.exampleResponseDummy);
      return expect(request.exampleResponses).to.have.length(3);
    });

    it('should remove example responses from the description', function () {
      const request = buildRequest(this.exampleResponseDummy);
      return expect(request.description).to.eql(
        'This is an example:\n\n\nmore text goes here\n\n\n\neven more text\n\n'
      );
    });

    it('should return null for example response code if it was not provided', function () {
      const request = buildRequest(this.exampleResponseDummy);
      return expect(request.exampleResponses[0].code).to.be.null;
    });

    it('should return correct status codes when provided', function () {
      const request = buildRequest(this.exampleResponseDummy);
      expect(request.exampleResponses[1].code).to.eql('200');
      return expect(request.exampleResponses[2].code).to.eql('404');
    });

    it('should return correct example', function () {
      const request = buildRequest(this.exampleResponseDummy);
      const values = request.exampleResponses.map((ex) => ex.value);

      return expect(values).to.deep.eql([
        'no status code',
        'response 200',
        'response 404',
      ]);
    });
  });
});
