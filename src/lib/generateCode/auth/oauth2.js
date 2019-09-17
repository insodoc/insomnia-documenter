// WIP.

export function getOAuth2Header() {
  return {
    name: 'Authorization',
    value: 'OAuth {{params}}, oauth_version="2.0"'
  };
};
