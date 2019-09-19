export function getNTLMAuthHeader() {
  return {
    name: 'Authorization',
    value: 'NTLM {{ntlm_token}}'
  };
};
