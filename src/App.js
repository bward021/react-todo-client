import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import TodoItem from "./components/todo-item";
import { API_URL } from "./api/api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      todos: [],
      isLoading: true,
      isSubmitting: false
    };
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleSubmit = (e) => {
    this.setState({
      isSubmitting: true
    })
    e.preventDefault();
    axios({
      method: "POST",
      url: `${API_URL}/add-todo`,
      data: {
        title: this.state.title,
        done: false,
        
      },
    })
      .then((res) => {
        this.setState({
          todos: [res.data, ...this.state.todos],
          title: "",
          isSubmitting: false
        });
      })
      .catch((err) => {
        this.setState({
          isSubmitting: false
        });
        console.log(err);
      });
  };

  handleDelete = (id) => {
    axios({
      method: "DELETE",
      url: `${API_URL}/delete-todo/${id}`,
    })
      .then((res) => {
        this.setState({
          todos: this.state.todos.filter(todo => {return todo.id !== id})
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderTodos() {
    return this.state.todos.map((todo) => {
      return (
       <TodoItem 
        key={todo.id}
        todo={todo}
        handleDelete={this.handleDelete}  
       />
      );
    });
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: `${API_URL}/get-all-todos`,
    })
      .then((res) => {
        this.setState({
          todos: res.data,
          isLoading: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="app">
        <h1>Todo List</h1>
        <form className="add-todo" onSubmit={this.handleSubmit}>
          <input
            required
            type="text"
            placeholder="Add Todo"
            onChange={this.handleChange}
            value={this.state.title}
          />
          <button disabled={this.state.isSubmitting} type="submit">Add</button>
        </form>
        {this.state.isSubmitting ? <FontAwesomeIcon icon={faSpinner} spin /> : null}
        {this.state.isLoading ? <FontAwesomeIcon icon={faSpinner} className="main-spinner" spin />
        : this.renderTodos()}
      </div>
    );
  }
}

export default App;
