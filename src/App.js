import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.setState({
      title: ""
    })
  }

  render() {
    return (
      <div className="app">
        <h1>Todo List</h1>
        <form className="add-todo">
          <input
            type="text"
            placeholder="Add Todo"
            onChange={this.handleChange}
            value={this.state.title}
          />
          <button type="submit" onSubmit={this.handleSubmit}>Add</button>
        </form>
      </div>
    );
  }
}

export default App;
