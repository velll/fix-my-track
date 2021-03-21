import React from 'react';
import Dropzone from './Dropzone';
import Workouts from './Workouts';

class Import extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {source: Source.file};

    this.toggleSource = this.toggleSource.bind(this);
  }

  toggleSource(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();

    this.setState(state => {
      return {
        source: state.source == Source.file ? Source.strava : Source.file
      };
    });
  }

  dropzone(){
    return <Dropzone onFileRead = {this.props.onFileRead} toggleSource={this.toggleSource}/>;
  }

  workouts() {
    return <Workouts/>;
  }

  render() {
    return this.state.source == Source.file ? this.dropzone() : this.workouts();
  }
}

interface Props {
  onFileRead: (content: string) => void
}

interface State {
  source: Source
}

enum Source {
  file,
  strava
}

export default Import;
