import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect, browserHistory,
} from 'react-router-dom';

import Dashboard from '../Dashboard';
import NavBar from '../NavBar';
import Footer from '../Footer';
import './styles.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className='app-body'>
        <NavBar/>
        <Router history={browserHistory}>
          <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Route
              path="/dashboard"
              render={props => <Dashboard {...props} />}
            />
          </Switch>
        </Router>
        <Footer/>
      </div>
    );
  }
}

export default App;
