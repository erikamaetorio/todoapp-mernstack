import React, { Component } from "react";
import axios from 'axios';

export default class CompleteTodo extends Component {

  constructor(props) {
    super(props);

    this.onChangeCompleted = this.onChangeCompleted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
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
                description: response.data.description,
                category: response.data.category,
                priority: response.data.priority,
                completed: response.data.completed
            })   
        })
        .catch(function (error) {
            console.log(error);
        })
  }

  onChangeCompleted(e) {
      this.setState({
          completed: !this.state.completed
      });
  }

  onSubmit(e) {
      e.preventDefault();
      const obj = {
          completed: this.state.completed
      };
      //console.log(obj);

      let updateTodoItemUrl = 'http://localhost:4000/todos/complete/'+this.props.match.params.id;
      axios.post(updateTodoItemUrl, obj)
          .then(res => console.log(res.data));
      
      this.props.history.push('/');
  }

  render () {
    return(
      <div>
                <h3 align="center">Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: {this.state.description}</label>
                    </div>
                    <div className="form-group">
                        <label>Category: {this.state.category}</label>
                    </div>
                    <div className="form-group">
                        <label>Priority: {this.state.priority}</label>
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeCompleted}
                                checked={this.state.completed}
                                value={this.state.completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
    )
  }
}