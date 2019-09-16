export function getBearerAuthHeader(token, prefix) {
  return {
    name: 'Authorization',
    value: `${prefix || 'Bearer'} ${token}`
  };
};
