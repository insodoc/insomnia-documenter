import pick from 'lodash.pick';

const reExampleResponse = /```response(:(\d+))?\n([\s\S]*?)\n```/gm;

function makeExampleResponse(match) {
  const code = match[2] || null;
  const value = match[3].trim();

  return { code, value };
}

export default function (requestData) {
  requestData = pick(
    requestData,
    '_id',
    'method',
    'name',
    'description',
    'parameters',
    'url',
    'authentication',
    'body',
    'headers',
    '_type'
  );

  if (!requestData.description) {
    return requestData;
  }

  const exampleResponses = [];

  let match;

  while ((match = reExampleResponse.exec(requestData.description))) {
    exampleResponses.push(makeExampleResponse(match));
  }

  requestData.exampleResponses = exampleResponses;
  requestData.description = requestData.description.replace(
    reExampleResponse,
    ''
  );

  return requestData;
}
