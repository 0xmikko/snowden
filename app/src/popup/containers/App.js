import React, { Component } from 'react';

import AppBar from "../components/AppBar/AppBar";
import Footer from "../components/Footer";

import Write from "./Write/Write"
import Read from "./Read/Read"
import SettingsForm from "./Settings/Settings"
import './App.css';


class App extends Component {

  render() {

    let routedPage;

    switch(this.props.path)
      {
        case 'write':
          routedPage=<Write />;
          break;
        case 'read':
          routedPage=<Read/>;
          break;
        case 'settings':
          routedPage=<SettingsForm/>;
          break;
        default:
          routedPage=<Read />;
          break;
      }


    return (
            <>
              <AppBar {...this.props}/>
              { routedPage }
              <Footer />
            </>
    );
  }
}

export default App;
