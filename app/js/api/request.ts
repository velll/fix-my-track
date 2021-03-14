async function get(url: string, headers = {}) {
  console.log(`GET ${url}`);

  const response = await fetch(url, {mode: 'cors', headers: headers} );
  const json = await response.json();

  return {status: response.status, json: json};
}

interface Params {
  [index:string]:(string|number)
}

interface Headers {
  [index:string]:(string|number)
}

export { get };
