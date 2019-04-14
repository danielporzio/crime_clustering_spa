import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect, browserHistory,
} from 'react-router-dom';

import Dashboard from '../dashboard';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
