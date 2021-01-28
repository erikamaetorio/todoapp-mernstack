import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {createBrowserHistory} from 'history';

//components
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import DeleteTodo from "./components/delete-todo.component";
import CreateCategoryOne from "./components/add-category-for-create.component";

import logo from './logo.png';

export const history = createBrowserHistory({ forceRefresh : true });

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="/">
            <img src={ logo } width="30" height="30" alt=""/>
          </a>
          {/* <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">To-Do List</Link>
                </li>
              </ul>
          </div> */}
        </nav>
        <br/>
        <Route path="/" exact component={TodosList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodo} />
        <Route path="/delete/:id" component={DeleteTodo} />
        <Route path="/add-category" component={CreateCategoryOne}/>
      </div>
    </Router>
  );
}

export default App;
