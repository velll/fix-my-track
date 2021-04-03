import { Activity } from "../../models/activity";

const SAVE_PROCESSED_ACTIVITY = (processed: Activity, original: string = '') => (
  {
    type: 'SAVE_PROCESSED_ACTIVITY',
    original: original,
    processed: processed
  }
);

export { SAVE_PROCESSED_ACTIVITY };
