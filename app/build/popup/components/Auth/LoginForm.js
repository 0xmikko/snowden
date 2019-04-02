import React, { Component } from 'react'
import { Link } from "react-router-dom"

import { Alert, Button, ButtonToolbar, ButtonGroup, Form, InputGroup, Card } from 'react-bootstrap';
import TextField from './TextField'
import './LoginForm.css'
import {getFullAPIAddress} from "../../utils/api";

export default class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  }

  handleInputChange = (event) => {
    const target = event.target,
      value = target.type ===
      'checkbox' ? target.checked : target.value,
      name = target.name
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.username, this.state.password)
  }

  render() {
    const errors = this.props.errors || {}
    console.log( window)
    return (

        <div className={'container-group'}>

        <Card className={'login-panel'}>
            <h2 className={'welcome-text'} style={{marginBottom: 0, marginTop: 10, textAlign: 'left'}}>Log into MicroCRM</h2>
            <div style={{marginBottom: 20, textAlign: 'left'}}>New to MicroCRM? &nbsp;<Link to={'/signup/'}>Sign Up</Link></div>
            <a href={getFullAPIAddress('/auth/google')}>
            <Button
                    className="login-button"
                    variant="outline-primary"
            >
               Login with Google
            </Button></a>
            <br />or<br/>
            <br />
            <Form onSubmit={this.onSubmit}>
            
              {
              errors.non_field_errors ?
                <Alert color="danger">
                    {errors.non_field_errors}
                </Alert>:""
              }
              <TextField name="username" 
                        placeholder="E-mail" 
                        error={errors.username}
                        onChange={this.handleInputChange} 
                        className="login-input"
                        />

              <TextField name="password"
                        placeholder="Password" 
                        error={errors.password} type="password"  
                        onChange={this.handleInputChange} 
                        className="login-input" />

              <Button type="submit"
                      className="login-button">
                 SIGN IN
              </Button>



              </Form>
        </Card>
</div>

    )
  }
}
