import { startWaiting, stopWaiting } from "../state/helpers/waits";

async function get(url: string, headers = {}) {
  console.log(`GET ${url}`);

  startWaiting();

  try {
    const response = await fetch(url, {mode: 'cors', headers: headers} );
    const json = await response.json();

    return {status: response.status, json: json};
  } finally {
    stopWaiting();
  }
}

interface Params {
  [index:string]:(string|number)
}

interface Headers {
  [index:string]:(string|number)
}

export { get };
