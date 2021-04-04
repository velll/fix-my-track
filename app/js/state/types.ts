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

interface GlobalState {
  stage: Stage,
  activity: ActivityState,
  waits: number,
  flashMessages: Message[]
}


export { GlobalState, ActivityState, Message, Stage };
