export default function (variable) {
  return variable.replace(/{{\s*(_.)?([a-zA-Z0-9_]+)\s*}}/g, '<span class="env-variable">$2</span>');
}
