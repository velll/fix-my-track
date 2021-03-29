import React from 'react';
import Athlete from '../models/athlete';
import Workout from '../models/workout';
import Strava from '../providers/strava/strava';
import WorkoutComponent from './Workout';
import { NEXT_STAGE } from '../state/actions/stages';
import { Activity } from '../models/activity';
import { connect, ConnectedProps } from 'react-redux';

class Workouts extends React.Component<Props, State> {

  provider: Strava;

  constructor(props: Props) {
    super(props);
    this.state = {workouts: [], athlete: {name: 'Not authorized'}};
    this.provider = new Strava();

    this.chooseWorkout = this.chooseWorkout.bind(this);
  }

  async componentDidMount() {
    const athlete = await this.provider.athlete();
    const workouts = await this.provider.workouts();

    this.setState({athlete: athlete, workouts: workouts });

  }

  workoutList() {
    return  <table className="table is-hoverable">
              <tbody>
                { this.state.workouts.map(workout => this.workoutRow(workout)) }
              </tbody>
            </table>;
  }

  workoutRow(workout: Workout) {
    return <WorkoutComponent workout={workout} choose={this.chooseWorkout} key={workout.id}/>;
  }

  async chooseWorkout(id: number) {
    console.log(`chose workout ${id}`);

    const workoutDetails = await this.provider.workout(id);

    console.log(workoutDetails);

    this.props.saveProcessed(workoutDetails);
    this.props.nextStage();
  }

  render() {
    return  <div>
              <h2 className="title">{this.state.athlete.name} workouts</h2>
              {this.workoutList()}
            </div>;
  }
}

interface State {
  athlete: Athlete
  workouts: Workout[]
}


const mapStateToProps = () => ({});

const mapDispatch = {
  nextStage: () => NEXT_STAGE,
  saveProcessed: (processed: Activity) => (
    {
      type: 'SAVE_PROCESSED_ACTIVITY',
      original: '',
      processed: processed
    }
  )
};

const connector = connect(mapStateToProps, mapDispatch);

interface Props extends ConnectedProps<typeof connector> {
}

export default connector(Workouts);
