import { Activity } from "../../models/activity";
import { withWait } from "../../state/helpers/waits";
import { TCX } from "../tcx";

function decode(source: string): Activity {
  const tcx = withWait(() => new TCX(source));

  return new Activity(tcx.sport, tcx.laps, source);
}

export { decode };
