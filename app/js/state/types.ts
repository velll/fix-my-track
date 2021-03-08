import { Activity } from "../activity";

enum Stage {
  start,
  show,
  export
}

interface ActivityState {
  original: string,
  processed: Activity
}

interface globalState {
  stage: Stage,
  activity: ActivityState
}

export { globalState, ActivityState, Stage };
