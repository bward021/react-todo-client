import React, { Component } from "react";
import axios from "axios";
import TodoItem from "./components/todo-item";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      todos: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "https://bw-flask-todo-api.herokuapp.com/api/add-todo",
      data: {
        title: this.state.title,
        done: false,
      },
    })
      .then((res) => {
        this.setState({
          todos: [res.data, ...this.state.todos],
          title: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleDelete = (id) => {
    axios({
      method: "DELETE",
      url: `https://bw-flask-todo-api.herokuapp.com/api/delete-todo/${id}`,
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
      url: "https://bw-flask-todo-api.herokuapp.com/api/get-all-todos",
    })
      .then((res) => {
        this.setState({
          todos: res.data,
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
            type="text"
            placeholder="Add Todo"
            onChange={this.handleChange}
            value={this.state.title}
          />
          <button type="submit">Add</button>
        </form>
        {this.renderTodos()}
      </div>
    );
  }
}

export default App;
