import { START_WAITING, STOP_WAITING } from "../actions/waits";
import store from "../store";

function startWaiting() {
  store.dispatch(START_WAITING);
}

function stopWaiting() {
  store.dispatch(STOP_WAITING);
}

function withWait<T>(func: () => T): T {
  startWaiting();

  try {
    return func();
  } finally {
    stopWaiting();
  }
}

// method decorator
function waiting(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
  const originalMethod = descriptor.value; // save a reference to the original method

  // NOTE: `function(` syntax so we have a correct `this`
  descriptor.value = function(...args: any[]) {
      withWait(() => originalMethod.apply(this, args));
  };

  return descriptor;
}

export { startWaiting, stopWaiting, withWait, waiting };
