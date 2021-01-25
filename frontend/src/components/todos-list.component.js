import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
  <tr>
    <td class={props.todo.completed ? 'completed' : ''}>{props.todo.description}</td>
    <td class={props.todo.completed ? 'completed' : ''}>{props.todo.category}</td>
    <td class={props.todo.completed ? 'completed' : ''}>{props.todo.priority}</td>
    <td>
      <Link to={'/edit/'+props.todo._id}>Edit</Link>
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
            <button type="button" class="btn btn-success"><Link to="/create" style={{ color: 'inherit', textDecoration: 'inherit' }}>Add item</Link></button>
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