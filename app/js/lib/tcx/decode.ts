import { Activity } from "../../models/activity";
import { withWait } from "../../state/helpers/waits";
import { TCXDocument } from "./tcx-document";

function decode(source: string): Activity | null {
  try {
    const tcx = withWait(() => new TCXDocument(source));
    return new Activity(tcx.sport, tcx.laps, source);
  } catch(e) {
    console.error(`Could not parse tcx file . ${e.message}`);
    return null;
  }
}

export { decode };
