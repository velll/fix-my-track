import React, { Component } from 'react';
import highlight from 'highlight.js';
import 'highlight.js/styles/github-gist.css';

class HighlightedCode extends React.Component<Props, {}>  {
  codeRef: React.RefObject<any>;

  constructor(props: Props) {
    super(props);

    this.codeRef = React.createRef();
  }

  componentDidMount () {
    highlight.highlightBlock(this.codeRef.current);
  }

  render () {
    return (
      <pre className="box is-white">
        <code className={this.props.language} ref={this.codeRef}>
          {this.props.children}
        </code>
      </pre>
    );
  }
}

interface Props {
  language: string,
  children?: React.ReactNode,
}

export { HighlightedCode };
