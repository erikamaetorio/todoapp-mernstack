import React, { Component } from "react";
import axios from 'axios';

const Category = props => (
    <option value={props.category.name}>{props.category.name}</option>
)

export default class EditTodo extends Component {

  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeCompleted = this.onChangeCompleted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      description: '',
      category: '',
      categories: [],
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
        });

    let getCategoryListUrl = 'http://localhost:4000/categories';
    axios.get(getCategoryListUrl)
        .then(response => {
        this.setState({ categories: response.data });
        })
        .catch((error) => {
        console.log(error);
        });
  }

  categoryList() {
    return this.state.categories.map((currentCategory, i) => {
      return <Category category={currentCategory} key={i} />;
    });
  }

  onChangeDescription(e) {
    this.setState({
        description: e.target.value
    });
  }

  onChangeCategory(e) {
      this.setState({
          category: e.target.value
      });
  }

  onChangePriority(e) {
      this.setState({
          priority: e.target.value
      });
  }

  onChangeCompleted(e) {
      this.setState({
          completed: !this.state.completed
      });
  }

  onSubmit(e) {
      e.preventDefault();
      const obj = {
          description: this.state.description,
          category: this.state.category,
          priority: this.state.priority,
          completed: this.state.completed
      };
      //console.log(obj);

      let updateTodoItemUrl = 'http://localhost:4000/todos/update/'+this.props.match.params.id;
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
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Category: </label>
                        <select value={this.state.category} onChange={this.onChangeCategory}>
                            { this.categoryList() }
                        </select>
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