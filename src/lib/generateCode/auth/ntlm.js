export function getNTLMAuthHeader () {
  return {
    name: 'Authentication',
    value: 'NTLM {{ntlm_token}}'
  };
};
