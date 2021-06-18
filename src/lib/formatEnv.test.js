import { expect } from 'chai';
import formatEnv from './formatEnv';

describe('formatEnv', function () {
  it('should replace env vars', function () {
    return expect(formatEnv('The url is {{url}} and {{_.url}}')).to.eql(
      'The url is <span class="env-variable">url</span> and <span class="env-variable">url</span>'
    );
  });

  it('should replace env vars with spaces', function () {
    return expect(formatEnv('The url is {{  url }} and {{ _.url  }}')).to.eql(
      'The url is <span class="env-variable">url</span> and <span class="env-variable">url</span>'
    );
  });

  it('should return an empty string for null input parameter', function () {
    return expect(formatEnv(null)).to.eql('');
  });
});
