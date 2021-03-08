import { Activity } from "../activity";

enum Stage {
  start,
  show,
  export
}

interface globalState {
  stage: Stage,
  activity: {
    original: string,
    processed: Activity
  } | undefined
}

export { globalState, Stage };
