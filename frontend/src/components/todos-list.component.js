import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import "../styles.css";

const Todo = props => (
  <tr>
    <td class={props.todo.completed ? 'completed' : ''}>{props.todo.description}</td>
    <td class={props.todo.completed ? 'completed' : ''}>{props.todo.category}</td>
    <td class={props.todo.completed ? 'completed' : ''}>{props.todo.priority}</td>
    <td>
      <div class="row">
        <Link to={'/edit/'+props.todo._id}><div class="col-sm-3"><FontAwesomeIcon icon={faEdit} color="grey"/></div></Link>
        <Link to={'/delete/'+props.todo._id}><div class="col-sm-5 col-sm-offset-2"><FontAwesomeIcon icon={faTrash} color="red"/></div></Link>
      </div>
    </td>
  </tr>
)

export default class TodosList extends Component {

  constructor(props) {
    super(props);
    this.state = {todos: []}
  }

  componentDidMount() {
    let getTodoListUrl = 'http://localhost:4000/todos';
    axios.get(getTodoListUrl)
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  todoList() {
    return this.state.todos.map((currentTodo, i) => {
      return <Todo todo={currentTodo} key={i} />;
    });
  }

  render () {
    return(
      <div class="container">
        <div class="row">
          <div class="col-sm-10 col-12">
            <h3>To-Do List</h3>
          </div>
          <div class="col-sm-2 col-12">
            <button type="button" class="btn btn-success"><Link to="/create" style={{ color: 'inherit', textDecoration: 'inherit' }}><FontAwesomeIcon icon={faPlus} color="white"/> To-Do</Link></button>
          </div>
        </div>
        <table className="table table-striped" style={{ marginTop: 20 }} >
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { this.todoList() }
            </tbody>
        </table>
      </div>
    )
  }
}