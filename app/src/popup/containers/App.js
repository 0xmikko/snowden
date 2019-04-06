import React, { Component } from 'react';
import {connect} from "react-redux";

import AppBar from "../components/AppBar/AppBar";
import ConnectionAppBar from "../components/AppBar/Connection";
import Footer from "../components/Footer";

import Write from "./Write/Write"
import Read from "./Read/Read"
import Settings from "./Settings/Settings"
import InstallGuide from "./Connection/InstallGuide"
import Broken from "./Connection/Broken"

import * as actions from "../actions/settings";
import * as status from "../../utils/status";

import './App.css';


class App extends Component {

  render() {

    console.log(this.props)

    let app, routedPage;

    switch (this.props.connection.status) {

      case status.STATUS_ACTIVE:
        switch (this.props.path) {
          case 'write':
            routedPage = <Write/>;
            break;
          case 'read':
            routedPage = <Read/>;
            break;
          case 'settings':
            routedPage = <Settings/>;
            break;
          default:
            routedPage = <Read/>;
            break;
        }
        app = <><AppBar {...this.props}/>{routedPage}<Footer/></>;
        break;

      case status.STATUS_INSTALL_NEEDED:
        app =  <><ConnectionAppBar /><InstallGuide {...this.props}/><Footer/></>;
        break;

      default:
         app =  <><ConnectionAppBar /><Broken {...this.props}/><Footer/></>;
        break;

    }

    return app;
  }
}


export default connect(state => state, actions)(App);
