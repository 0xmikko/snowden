import React, { Component } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link } from "react-router-dom"

import TextField from './TextField'
import './LoginForm.css'
import { signup } from "../../actions/auth";
import { authErrors, isAuthenticated } from "../../reducers";
import { connect } from "react-redux";

export class SignUpForm extends Component {
  state = {
    username: '',
    password: '',
    emailCorrect: false,
    more8: false,
    less20: false,
    oneCapital: false,
    oneNumber: false,
    passwdEquals: true,
    formCorrect: false,
    changedAfterSubmit: true
  }


  handleInputChange = (event, validation) => {
    let check;
    const target = event.target,
      value = target.type ===
      'checkbox' ? target.checked : target.value,
      name = target.name
    this.setState({
      [name]: value,
      changedAfterSubmit: true
    });

    switch (validation) {
      case 'email':
        check = this.validateEmail(value) && this.validatePassword(this.state.password)

        break;

      case 'password':
        check = this.validatePassword(value) && this.validateEmail(this.state.username)
        break;
    }
    this.setState({ formCorrect: check });
  }

  validateEmail = (value) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = re.test(String(value).toLowerCase());
    this.setState({ emailCorrect: result });
    return result
  }

  validatePassword = (value) => {

    let newState = {
      more8: true,
      oneLowerCase: true,
      oneUpperCase: true,
      oneNumber: true,
      passwdEquals: true
    }

    let res = true
    const value_lenght = value.length;

    // Check #1: Should be more than 8
    if ((value_lenght < 8) || (value_lenght > 20)) {
      newState.more8 = false;
      res = false;
    }
    if (value === value.toUpperCase()) {
      newState.oneLowerCase = false;
      res = false;
    }
    if (value === value.toLowerCase()) {
      newState.oneUpperCase = false;
      res = false;
    }


    if (!value.match(/\d+/g)) {
      newState.oneNumber = false;
      res = false;
    }
    this.setState(newState);
    return res

  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.username, this.state.password)
    this.setState({ changedAfterSubmit: false })
  }


  render() {
    const errors = this.props.errors || {}
    return (

      <div className={'container-group'}>
     
      <Card className={'signup-panel'}>
            <h2 className={'welcome-text'} style={{marginBottom: 0, marginTop: 10, textAlign: 'left'}}>Log into MicroCRM</h2>
            <div style={{marginBottom: 20, textAlign: 'left'}}>Have already account? &nbsp;<Link to={'/login/'}>Log in</Link></div>

            <Form onSubmit={this.onSubmit}>
            
              {
                ((errors.length>0) && (!this.state.changedAfterSubmit))?
                <Alert color="danger">
                    {errors}
                </Alert>:""
              }
            <TextField name="username"
                        placeholder="E-mail" 
                        error={errors.username}
                        onChange={(event) => this.handleInputChange(event, 'email')}
                        className="login-input" />

             <Form.Control
                        name="password"
                        type="password"
                        value={this.state.value}
                        placeholder="Password"
                        onChange={(event) => this.handleInputChange(event, 'password')}
                        className="login-input"
                    />

              <Form.Label />

              <Form.Label style={{color: (this.state.emailCorrect) ? '#009900' : '#777777', margin: '10px 0 0 0'}}>
                  Correct email as username
              </Form.Label><br/>

              <Form.Label style={{color: (this.state.more8) ? '#009900' : '#777777', margin: 0 }}>
                  Password should be more 8 and less 20 symbols
              </Form.Label><br/>

              <Form.Label style={{color: (this.state.oneUpperCase) ? '#009900' : '#777777', margin: 0}}>
                  At least one upper case letter
              </Form.Label><br/>

              <Form.Label style={{color: (this.state.oneLowerCase) ? '#009900' : '#777777', margin: 0}}>
                  At least one lower case letter
              </Form.Label><br/>

              <Form.Label style={{color: (this.state.oneNumber) ? '#009900' : '#777777', margin: '0 0 10px 0'}}>
                  Should be one number
              </Form.Label><br/>

              <Button type="submit"
                      size="lg"
                      className="login-button"
                      disabled={!this.state.formCorrect}>
                  Sign Up
              </Button><br/><br/>
            </Form>
      </Card>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  errors: authErrors(state),
  isAuthenticated: isAuthenticated(state)
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (username, password) => dispatch(signup(username, password))

})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
