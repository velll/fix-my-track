import { Source } from "../types";

const SET_SOURCE = (source: Source) => (
  {
    type: 'SET_SOURCE',
    source: source
  }
);

export { SET_SOURCE };
