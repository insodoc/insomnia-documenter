import { getBasicAuthHeader } from './basic';
import { getBearerAuthHeader } from './bearer';
import { getOAuth1Header } from './oauth1';
import { getOAuth2Header } from './oauth2';
import { getHawkAuthHeader } from './hawk';
import { getNTLMAuthHeader } from './ntlm';
import { getASAPHeader } from './asap';

function getDefaultAuthHeader() {
  return {
    name: 'Authorization',
    value: '{{authorization}}'
  };
}

export default function generateAuthHeader(auth) {
  switch (auth.type) {
    case 'basic':
      return getBasicAuthHeader(auth.username, auth.password);
    case 'bearer':
      return getBearerAuthHeader(auth.token, auth.prefix);
    case 'oauth1':
      return getOAuth1Header(auth);
    case 'oauth2':
      return getOAuth2Header();
    case 'hawk':
      return getHawkAuthHeader(auth.id);
    case 'ntlm':
      return getNTLMAuthHeader();
    case 'asap':
      return getASAPHeader();
    default:
      return getDefaultAuthHeader();
  }
};
