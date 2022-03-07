/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { TextInput, Button, Icon, Checkbox, Switch } from 'react-materialize';

class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        text: '',
        todoList: [],
        apiMsg: ''
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
          apiMsg: response.data.apiMsg,
          todoList: response.data.todos
        })
      })
      .catch(error => {
        this.setState({apiMsg: error.message});
      });
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.submit();
    }
  }

  submit = () => {
    if(this.state.text !='') {
      axios.post('http://localhost:3001/todo', {'text': this.state.text})
        .then((response) =>{
          this.setState(state => {
            const todoList = state.todoList.concat({'text': this.state.text, 'isDone': false});
            return {
              todoList,
              text: '',
              apiMsg: response.data
            };
          });
        })
        .catch(error => {
          this.setState({apiMsg: error.message});
        });
    } else {
      this.setState({apiMsg: 'please enter todo!'});
    }
  }

  delete = (id) => {
    //if (confirm("Do you want to delete? " + id)) {
      axios.delete(`http://localhost:3001/todo/${id}`)
        .then((response) =>{

          this.setState({
            todoList: []
          });

          this.setState({
              todoList: response.data.todos,
              apiMsg: response.data.apiMsg
          });

        })
        .catch(error => {
          this.setState({apiMsg: error.message});
        });
    //}
  }

  edit = (id) => {
    axios.put(`http://localhost:3001/todo/${id}`)
      .then((response) =>{
        this.setState({apiMsg: response.data});
      })
      .catch(error => {
        this.setState({apiMsg: error.message});
      });
  }


  render() {
    let todoList = this.state.todoList.map((val, key) => {
      return (

        <div className="todo">
          
          <Checkbox
            id={'todo' + key}
            label={val.text}
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
        <h3>{this.state.apiMsg}</h3>
        <div className='form'>

          <TextInput
            id='text'
            label='Enter Todo'
            value={this.state.text}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
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