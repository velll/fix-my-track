const SHOW_MESSAGE = (text: string) => (
  {
    type: 'SHOW_MESSAGE',
    text: text
  }
);

const DISCARD_MESSAGES = { type: 'DISCARD_MESSAGES' };

export { SHOW_MESSAGE, DISCARD_MESSAGES };
