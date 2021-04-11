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

interface Message {
  text: string
}

enum Source {
  file,
  strava
}

interface GlobalState {
  stage: Stage,
  source: Source,
  activity: ActivityState,
  waits: number,
  flashMessages: Message[]
}

export { GlobalState, ActivityState, Message, Stage, Source };
