import pick from 'lodash.pick';

export default function (requestData) {
  requestData = pick(requestData, '_id', 'method', 'name', 'description', 'parameters', 'url', 'authentication', 'body', 'headers', '_type');

  if (!requestData.description) {
    return requestData;
  }

  let description = requestData.description;
  let exampleResponse = null;

  const descriptionAndResponse = description.split('<!-- RESPONSE -->');

  if (descriptionAndResponse.length > 1) {
    exampleResponse = descriptionAndResponse[1].split('<!-- ENDRESPONSE -->')[0];
    description = description.replace(`<!-- RESPONSE -->${exampleResponse}<!-- ENDRESPONSE -->`, '');
  }

  requestData.description = description.trim();
  requestData.exampleResponse = exampleResponse && exampleResponse.trim();

  return requestData;
}
