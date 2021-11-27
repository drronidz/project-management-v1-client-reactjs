import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import React, {Component} from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/layout/Header";

class App extends Component{

  render() {
    return (
        <div className="App">
            <Header/>
            <Dashboard/>
        </div>
    );
  }


}

export default App;
