export function getASAPHeader() {
  return {
    name: 'Authorization',
    value: 'Bearer {{jwt_token}}'
  };
};
