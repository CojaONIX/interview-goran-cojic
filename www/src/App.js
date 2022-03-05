/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { TextInput, Button, Icon, Checkbox } from 'react-materialize';

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
        <div className="todo">
          <Checkbox
            id={'todo' + key}
            label={val.text}
            value={'' + key}
            checked={val.isDone}
            onChange={() => { this.edit(key) }}
          />

          <Button
            className="red"
            floating
            icon={<Icon>remove_circle</Icon>}
            node="button"
            waves="light"
            onClick={() => { this.delete(key) }}
          />

        </div>
      )
    })

    return (
      <div className='App'>
        <h1>Todo list</h1>
        <div className='form'>

          <TextInput
            id='text'
            label='Enter Todo'
            onChange={this.handleChange}
          />
          <Button
            className="blue"
            floating
            icon={<Icon>add</Icon>}
            node="button"
            waves="light"
            onClick={() => { this.submit() }}
          />          
        </div>


        <div>{todoList}</div>

      </div>
      
    );
  }
}
export default App;