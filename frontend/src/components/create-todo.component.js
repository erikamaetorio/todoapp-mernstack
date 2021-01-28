import React, { Component } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { history } from '../App';

const Category = props => (
  <option value={props.category.name}>{props.category.name}</option>
)

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
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

  onSubmit(e) {
    e.preventDefault();

    // console.log(`Form submitted:`);
    // console.log(`Description: ${this.state.description}`);
    // console.log(`Assigned: ${this.state.assigned}`);
    // console.log(`Priority: ${this.state.priority}`);

    const newTodoItem = {
      description: this.state.description,
      category: this.state.category,
      priority: this.state.priority,
      completed: this.state.completed
    }

    const createTodoItemUrl = 'http://localhost:4000/todos/add';

    axios.post(createTodoItemUrl, newTodoItem)
      .then(res => console.log(res.data));

    this.setState({
      description: '',
      category: '',
      priority: '',
      completed: false
    })

    history.push('/');
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
                        <label>Category: </label>
                        <div className="row">
                          <div className="col-md-10">
                            <select class="form-control" value={this.state.category} onChange={this.onChangeCategory}>
                            <option value="" selected disabled hidden>Choose here</option>
                                { this.categoryList() }
                            </select>
                          </div>
                          <div className="col-md-2">
                            <button type="button" class="btn btn-success"><Link to="/add-category" style={{ color: 'inherit', textDecoration: 'inherit' }}><FontAwesomeIcon icon={faPlus} color="white"/> Category</Link></button>
                          </div>
                        </div>
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