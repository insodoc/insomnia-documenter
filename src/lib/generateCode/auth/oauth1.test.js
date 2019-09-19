import { getOAuth1Header } from './oauth1';
import { expect } from 'chai';

describe('OAuth1 authentication', function () {
  describe('#getOAuth1Header', function () {
    beforeEach(function () {
      this.basicOpts = {
        callback: '/auth',
        consumerKey: 'consumer_key',
        signatureMethod: 'HMAC-SHA1',
        tokenKey: 'token_key'
      };
    });

    it('should return proper auth header', function () {
      const expectedValue = [
        'OAuth oauth_callback="/auth"',
        'oauth_consumer_key="consumer_key"',
        'oauth_nonce="{{oauth_nonce}}"',
        'oauth_signature="{{oauth_signature}}"',
        'oauth_signature_method="HMAC-SHA1"',
        'oauth_timestamp="1103493600"',
        'oauth_token="token_key"',
        'oauth_version="1.0"'
      ].join(', ');

      return expect(getOAuth1Header(this.basicOpts)).to.eql({
        name: 'Authorization',
        value: expectedValue
      });
    });

    it('should include custom nonce', function () {
      const expectedValue = [
        'OAuth oauth_callback="/auth"',
        'oauth_consumer_key="consumer_key"',
        'oauth_nonce="woah"',
        'oauth_signature="{{oauth_signature}}"',
        'oauth_signature_method="HMAC-SHA1"',
        'oauth_timestamp="1103493600"',
        'oauth_token="token_key"',
        'oauth_version="1.0"'
      ].join(', ');

      return expect(getOAuth1Header({
        ...this.basicOpts,
        ...{ nonce: 'woah' }
      })).to.eql({
        name: 'Authorization',
        value: expectedValue
      });
    });

    it('should include custom timestamp', function () {
      const expectedValue = [
        'OAuth oauth_callback="/auth"',
        'oauth_consumer_key="consumer_key"',
        'oauth_nonce="{{oauth_nonce}}"',
        'oauth_signature="{{oauth_signature}}"',
        'oauth_signature_method="HMAC-SHA1"',
        'oauth_timestamp="1558224000"',
        'oauth_token="token_key"',
        'oauth_version="1.0"'
      ].join(', ');

      return expect(getOAuth1Header({
        ...this.basicOpts,
        ...{ timestamp: 1558224000 }
      })).to.eql({
        name: 'Authorization',
        value: expectedValue
      });
    });
  });
});
