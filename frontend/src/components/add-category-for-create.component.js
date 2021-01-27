import React, { Component } from "react";
import axios from 'axios';

export default class AddCategoryForCreateTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    }

    this.onChangeName = this.onChangeName.bind(this);
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newCategoryItem = {
      name: this.state.name
    }

    const createCategoryItemUrl = 'http://localhost:4000/categories/add';

    axios.post(createCategoryItemUrl, newCategoryItem)
      .then(res => console.log(res.data));

    this.setState({
      name: ''
    })

    this.props.history.push('/create');
  }

  render () {
    return(
        <div style={{marginTop: 10}}>
        <h3>Add New Category</h3>
        <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
                <label>Name: </label>
                <input  type="text"
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangeName}
                        />
            </div>

            <div className="form-group">
                <input type="submit" value="Add Category" className="btn btn-primary" />
            </div>
        </form>
    </div>
    )
  }
}