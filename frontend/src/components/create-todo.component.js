import React, { Component } from "react";
import axios from 'axios';

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAssigned = this.onChangeAssigned.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      description: '',
      assigned: '',
      priority: '',
      completed: false
    }
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeAssigned(e) {
    this.setState({
      assigned: e.target.value
    });
  }

  onChangePriority(e) {
    this.setState({
      priority: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    // console.log(`Form submitted:`);
    // console.log(`Description: ${this.state.description}`);
    // console.log(`Assigned: ${this.state.assigned}`);
    // console.log(`Priority: ${this.state.priority}`);

    const newTodoItem = {
      description: this.state.description,
      assigned: this.state.assigned,
      priority: this.state.priority,
      completed: this.state.completed
    }

    const createTodoItemUrl = 'http://localhost:4000/todos/add';

    axios.post(createTodoItemUrl, newTodoItem)
      .then(res => console.log(res.data));

    this.setState({
      description: '',
      assigned: '',
      priority: '',
      completed: false
    })
  }

  render () {
    return(
      <div style={{marginTop: 10}}>
                <h3>Create New To-Do Item</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.assigned}
                                onChange={this.onChangeAssigned}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.priority==='Low'} 
                                    onChange={this.onChangePriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.priority==='Medium'} 
                                    onChange={this.onChangePriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.priority==='High'} 
                                    onChange={this.onChangePriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
    )
  }
}