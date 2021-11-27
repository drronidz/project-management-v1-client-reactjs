import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import React, {Component} from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/layout/Header";
import {BrowserRouter, Route} from "react-router-dom";
import AddProject from "./components/project/AddProject";

class App extends Component{

  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/addProject" component={AddProject}/>
            </div>
        </BrowserRouter>
    );
  }


}

export default App;
