export default function (value, env) {
  if (!value) {
    return null;
  }

  Object.keys(env.data).forEach(key => {
    value = value.replace(new RegExp('{{([\\s' + key + ']+)}}', 'g'), env.data[key]);
  });

  return value;
}
