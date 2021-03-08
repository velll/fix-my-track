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

interface GlobalState {
  stage: Stage,
  activity: ActivityState
}

export { GlobalState, ActivityState, Stage };
