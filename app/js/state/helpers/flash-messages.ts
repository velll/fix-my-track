import { DISCARD_MESSAGES, SHOW_MESSAGE } from "../actions/flash_messages";
import store from "../store";

function notify(text: string) {
  store.dispatch(SHOW_MESSAGE(text));
}

function discardAll() {
  store.dispatch(DISCARD_MESSAGES);
}

export { notify };
