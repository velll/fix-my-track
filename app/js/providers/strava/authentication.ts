const prefix = 'https://www.strava.com/oauth/authorize';

const queryParams: Dict<string> = {
  scope: encodeURI("activity:read"),
  client_id: clientId(),
  redirect_uri: encodeURI(window.location.origin + '/token'),

  response_type: 'code',
  approval_prompt: 'auto'
};

const queryString = Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&');

const query = `${prefix}?${queryString}`;

function authenticate() {
  window.location.href = query;
}

function clientId() {
  return document.getElementsByName('STRAVA_CLIENT_ID')[0].getAttribute('content');
}

interface Dict<T> {
  [index:string]: T | null
}

export default authenticate;
