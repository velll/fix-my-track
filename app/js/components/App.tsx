import * as React from "react";

class App extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public async componentDidMount() {
    console.log("app mounted");
  }


  public render() {
   return <div className="app-container container">
            List of all trackpoints
          </div>;
  }
}

interface Props {
}

interface State {
}

export { App };
