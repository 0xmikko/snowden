import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';

//import Translate from "./Translate/TranslateForm"

import './App.css';
import AppBar from "../components/AppBar/AppBar";


const A = (props) => ("HELLO");
const B = (props) => ("ODD");

class App extends Component {
  render() {
    return (
      <React.Fragment>

        <AppBar {...this.props}/>

        <Switch>
            <Route path="/translate/"  component={A}/>
            <Route path="/readers/" component={B}/>
            <Route path="/settings/" component={A}/>
            <Route path='*' component={B}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
