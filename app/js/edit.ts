import { Trackpoint } from "./activity";
import { replaceAt } from "./lib/array";

class Edit {
  trackpointNo: number;
  edited: Trackpoint;

  constructor(trackpointNo: number, edited: Trackpoint) {
     this.trackpointNo = trackpointNo;
     this.edited = edited;
  }

  apply(trackpoints: Trackpoint[]) {
    console.log('applying edited trackpoint');
    return replaceAt(trackpoints, this.trackpointNo, this.edited);
  }
}

export { Edit };
