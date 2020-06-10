export function getBasicAuthHeader(username = null, password = null) {
  const header = `${username || ''}:${password || ''}`;
  const authString = btoa(header); // eslint-disable-line no-undef

  return {
    name: 'Authorization',
    value: `Basic ${authString}`
  };
};
