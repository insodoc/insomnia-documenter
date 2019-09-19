export function getOAuth1Header(opts) {
  const {
    callback,
    consumerKey,
    nonce,
    signatureMethod,
    timestamp,
    tokenKey
  } = opts;

  const value = `OAuth oauth_callback="${callback}",
oauth_consumer_key="${consumerKey}",
oauth_nonce="${nonce || '{{oauth_nonce}}'}",
oauth_signature="{{oauth_signature}}",
oauth_signature_method="${signatureMethod}",
oauth_timestamp="${timestamp || 1103493600}",
oauth_token="${tokenKey}",
oauth_version="1.0"`.split('\n').join(' ');

  return {
    name: 'Authorization',
    value
  };
};
