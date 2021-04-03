import Athlete from "../models/athlete";
import Workout from "../models/workout";

interface Provider {
  athlete: () => Promise<Athlete>
  workouts: () => Promise<Workout[]>
}

export { Provider };
