import React, { Component } from "react";
import {Card, Tab, Nav, Container, Row, Button, Col, ListGroup, Form, InputGroup} from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../../actions/encrypt";


class WriteForm extends Component {

    state = {
        text: ''
    }

    handleInputChange = (event) => {
        console.log(this.state)
        const target = event.target,
          value = target.type ===
          'checkbox' ? target.checked : target.value,
          name = target.name
        console.log(target.name)
        this.setState({
          [name]: value
        });
    }

    onSubmit = (event) => {

        event.preventDefault()
        console.log(this.state)
        const text = {text: this.state.text}

        const hashSent = 'ForMIK' + Date();
        this.props.encryptPost(text, hashSent);
    }

    render() {

        console.log("HERR")

        const disabled = (this.state.text===undefined) || (this.state.text.length ===0)

        return (
            <div>

            <Container fluid style={{ paddingLeft: 20, paddingRight: 20, marginTop: 15}}>
            <h3>Translate</h3>
            <Form onSubmit={this.onSubmit}>
                  <Form.Group as={Col} md={12} style={{padding: "0 0 0 0"}}>
                    <Form.Label>Post to encrypt</Form.Label>
                        <Form.Control
                            as="textarea"
                            name = { "text" }
                            style= {{height: 340, verticalAlign: "top"}}
                            onChange={(event) => this.handleInputChange(event)}
                          />
                    <Form.Control.Feedback type="invalid">
                    </Form.Control.Feedback>
                </Form.Group>
                 <Button type="submit" disabled={disabled}>Encode post</Button>
            </Form>
        </Container>
      </div>

    );

    }

};


export default connect(state => state, actions)(WriteForm);
