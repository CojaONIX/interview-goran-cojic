/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        text: '',
        fetchData: []
      }
  }

  handleChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  componentDidMount() {
    axios.get("http://localhost:3001/todo")
      .then((response) => {
        this.setState({
          fetchData: response.data
        })
      })
  }

  submit = () => {
    axios.post('http://localhost:3001/todo', {'text': this.state.text, "isDone": false})
    console.log(this.state)
    document.location.reload();
  }

  delete = (id) => {
    if (confirm("Do you want to delete? " + id)) {
      axios.delete(`http://localhost:3001/todo/${id}`)
      document.location.reload()
    }
  }

  edit = (id) => {
    axios.put(`http://localhost:3001/todo/${id}`)
    //document.location.reload();
  }


  render() {
    let todoList = this.state.fetchData.map((val, key) => {
      return (
        <div>
          <input id={key} name='id' type="checkbox" defaultChecked={val.isDone} onChange={() => { this.edit(key) }}></input> 
          <label for={key} style={{margin: "10px", width: "500px", textAlign: "left"}}>{val.text}</label>
          <button onClick={() => { this.delete(key) }}>D</button>
        </div>
      )
    })

    return (
      <div className='App'>
        <h1>Todo list</h1>
        <div className='form'>
          <input name='text' placeholder='Enter Todo' onChange={this.handleChange} />
        </div>
        <button onClick={() => { this.submit() }}>Submit</button>

        <div>{todoList}</div>
      </div>
    );
  }
}
export default App;