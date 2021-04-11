import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { SET_SOURCE } from '../state/actions/sources';
import { Source } from '../state/types';
import { GlobalState } from '../state/types';
import Dropzone from './Dropzone';
import Workouts from './Workouts';

class Import extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this.state = {source: Source.file};

    this.toggleSource = this.toggleSource.bind(this);
  }

  toggleSource(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();

    const newSource = this.props.source == Source.file ? Source.strava : Source.file;
    this.props.setSource(newSource);
  }

  dropzone(){
    return <Dropzone onFileRead = {this.props.onFileRead} toggleSource={this.toggleSource}/>;
  }

  workouts() {
    return <Workouts/>;
  }

  render() {
    return this.props.source == Source.file ? this.dropzone() : this.workouts();
  }
}

function mapStateToProps(state: GlobalState) {
  return { source: state.source };
}

const mapDispatch = {
  setSource: SET_SOURCE
};

const connector = connect(mapStateToProps, mapDispatch);

interface Props extends ConnectedProps<typeof connector> {
  onFileRead: (content: string) => void
}

export default connector(Import);
