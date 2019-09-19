export function getHawkAuthHeader(id) {
  return {
    name: 'Authorization',
    value: `Hawk id="${id}", ts="1103493600", nonce="{{hawk_nonce}}", mac="{{hawk_mac}}"`
  };
};
