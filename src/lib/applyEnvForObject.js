import applyEnv from './applyEnv';

export default function applyEnvForObject(object, env) {
  let obj = object;
  if (typeof obj === 'object') {
    obj = JSON.parse(JSON.stringify(object));
    replaceObjectValues(obj, env);
  }
  return obj;
}

function replaceObjectValues(obj, env) {
  Object.keys(obj).forEach(key => {
    if (obj[key] !== null) {
      switch (typeof obj[key]) {
        case 'object':
          replaceObjectValues(obj[key], env);
          break;
        case 'string':
          obj[key] = applyEnv(obj[key], env);
          break;
      }
    }
  });
}
