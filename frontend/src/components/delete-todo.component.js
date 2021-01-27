import React, { Component } from "react";
import axios from 'axios';

export default class DeleteTodo extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    
        this.state = {
          id: '',  
          description: '',
          category: '',
          priority: '',
          completed: false
        }
      }
    
      componentDidMount() {
        let getTodoItemUrl = 'http://localhost:4000/todos/'+this.props.match.params.id;
        axios.get(getTodoItemUrl)
            .then(response => {
                this.setState({
                    id: response.data._id,
                    description: response.data.description,
                    category: response.data.category,
                    priority: response.data.priority,
                    completed: response.data.completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            });
      }
    
      handleClick() {
          let deleteTodoItemUrl = 'http://localhost:4000/todos/delete/'+this.props.match.params.id;
          axios.put(deleteTodoItemUrl)
              .then(res => console.log(res.data));
    
          this.props.history.push('/');
      }
    
      render () {
        return(
          <div class="container">
            <h3 align="center">Would you like to delete this item?</h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Description: {this.state.description}</li>
                <li class="list-group-item">Category: {this.state.category}</li>
                <li class="list-group-item">Priority: {this.state.priority}</li>
            </ul>

            <div class="row justify-content-center">
            <button type="button" class="btn btn-danger" onClick={this.handleClick}>Delete</button>
            </div>                    
            </div>
        )
      }
}