import pick from 'lodash.pick';

const reExampleResponse = /<!--(?:\s+)?RESPONSE(?:\s+)((?:\d){3})?(?:\s+)?-->\n(.|\n)*?<!--(?:\s+)?ENDRESPONSE(?:\s+)?-->/gm;

function makeExampleResponse(match) {
  const code = match[1] || null;
  const value = match[0].slice(match[0].indexOf('>') + 1, match[0].lastIndexOf('<')).trim();

  return { code, value };
}

export default function (requestData) {
  requestData = pick(requestData, '_id', 'method', 'name', 'description', 'parameters', 'url', 'authentication', 'body', 'headers', '_type');

  if (!requestData.description) {
    return requestData;
  }

  const exampleResponses = [];

  let match;
  // eslint-disable-next-line no-cond-assign
  while (match = reExampleResponse.exec(requestData.description)) {
    exampleResponses.push(makeExampleResponse(match));
  }

  requestData.exampleResponses = exampleResponses;
  requestData.description = requestData.description.replace(reExampleResponse, '');

  return requestData;
}
