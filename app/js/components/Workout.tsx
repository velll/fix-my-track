import React from 'react';
import WorkoutModel from '../models/workout';

function Workout(props: Props) {
  const workout = props.workout;
  const onClick = () => props.choose(workout.id);

  return  <tr onClick={onClick}>
            <td> {workout.id} </td>
            <td> {workout.name} </td>
            <td> {workout.startDate} </td>
          </tr>;
}

interface Props {
  workout: WorkoutModel,
  choose: (id: number) => void
}

export default Workout;
