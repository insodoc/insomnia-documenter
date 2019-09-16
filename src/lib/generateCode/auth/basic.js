export function getBasicAuthHeader(username = null, password = null) {
  const header = `${username || ''}:${password || ''}`;
  const authString = btoa(header);
  
  return {
    name: 'Authorization',
    value: authString
  };
};
