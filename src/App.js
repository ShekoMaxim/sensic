import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import ExcelTable from "./Components/ExcelTable";
import GetSheetDone from 'get-sheet-done';
import './App.css';

class App extends Component {

  render() {
    return (
      <HashRouter>
        <div className="App">

          <div className="App-intro">
            <Route exact path="/" component={ExcelTable} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
