export default function (value, env) {
  if (!value) {
    return null;
  }

  Object.keys(env.data).forEach(key => {
    console.log('checking', key, 'in', value);
    value = value.replace(new RegExp('{{([\\s' + key + ']+)}}', 'g'), env.data[key]);
  });

  return value;
}
