import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//components
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";

import logo from './logo.png';
console.log(logo);

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="https://google.com" target="_blank">
            <img src={ logo } width="30" height="30" alt=""/>
          </a>
          <Link to="/" className="navbar-brand">To-Do App</Link>
          <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">To-Do List</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create To-Do item</Link>
                </li>
              </ul>
          </div>
        </nav>
        <br/>
        <Route path="/" exact component={TodosList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodo} />
      </div>
    </Router>
  );
}

export default App;