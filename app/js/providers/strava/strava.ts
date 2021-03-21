import { getCookie } from "../../lib/cookies";
import { get } from "../../api/request";
import { Provider } from "../base";
import { Activity } from "../../models/activity";
import authenticate from "./authentication";

const prefix = "https://www.strava.com/api/v3/";

class Strava implements Provider {
  authorization() {
    const token = getCookie('strava-token');

    return `Bearer ${token}`;
  }

  async fetch(path: string) {
    const url = `${prefix}${path}`;
    const headers = {'Authorization' : this.authorization() };

    const response = await get(url, headers);

    console.log(`called ${url}`);
    console.log(response);

    if (response.status == 401) {
      authenticate();
    } else {
      return response.json;
    }
  }

  async athlete() {
    const response = await this.fetch('/athlete');
    return {name: `${response.firstname} ${response.lastname}` };
  }

  async workouts() {
    const response = await this.fetch('/athlete/activities');
    return (response as any[]).map(activity => (
      {
         name: activity.name,
         startDate: activity.start_date,
         id: activity.id
      }
    ));
  }

  async workout(id: number) {
    const streams = await this.fetch(`/activities/${id}/streams?keys=latlng,time`);

    console.log(streams);

    const coordinatesStream = (streams as any[]).filter(stream => stream.type == 'latlng')[0].data;
    const timesStream = (streams as any[]).filter(stream => stream.type == 'time')[0].data;

    console.log(coordinatesStream);

    const trackpoints = (coordinatesStream as number[][]).map((coordinates, index) => (
      {
        lat:  coordinates[0],
        long: coordinates[1],
        time: timesStream[index]
      }
    ));

    return Activity.fromTrackpoints({name: 'whatever run', time: 1}, trackpoints);
  }
}

export default Strava;