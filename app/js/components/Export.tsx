import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { encode } from '../lib/tcx/encode';
import { waiting } from '../state/helpers/waits';
import { GlobalState } from '../state/types';
import { HighlightedCode } from './HighlightedCode';

class Export extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  @waiting
  componentDidMount() {
    const TCXContents = encode(this.props.activity);

    const file = new Blob([TCXContents], {type: 'application/xml'});
    const href = URL.createObjectURL(file);

    this.setState({href: href, tcx: TCXContents, blob: file});
  }

  render() {
    return  <div className="container">
              <h2 className='title is-2 is-spaced'>Export adjusted tcx</h2>

              <div className='buttons'>
                <a href={this.state.href} className="button is-primary" download="processed.tcx">Download</a>
              </div>

              <div>
                <HighlightedCode language="xml">
                  {this.state.tcx}
                </HighlightedCode>
              </div>
            </div>;
  }
}

function mapStateToProps(state: GlobalState) {
  return { activity: state.activity?.processed };
}

const connector = connect(mapStateToProps);

interface Props extends ConnectedProps<typeof connector> {
}

interface State {
  href?: string;
  tcx? :string;
  blob?: Blob;
}

export default connector(Export);
