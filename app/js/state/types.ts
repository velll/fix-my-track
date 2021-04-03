import { Activity } from "../models/activity";

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
  activity: ActivityState,
  waits: number
}

export { GlobalState, ActivityState, Stage };
