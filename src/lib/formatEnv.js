function formatEnv(variable) {
  return variable.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, '<span class="env-variable">$1</span>');
}

export default formatEnv;
