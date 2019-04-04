import React, { Component } from "react";
import {Card, Tab, Nav, Container, Row, Button, Col, ListGroup, Form, InputGroup} from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../../actions/encrypt";
import {CopyToClipboard} from "react-copy-to-clipboard";


class WriteSuccess extends Component {

    state={
        copied: false
    }

    render() {

        return (
            <div>

            <Container fluid style={{ paddingLeft: 20, paddingRight: 20, marginTop: 15}}>
            <h3>Traslated post</h3>

            <Card style={{height: 340, marginBottom: 10, overflow: "scroll"}}>
                <Card.Body>
                     {this.props.encrypt.encrypted}
                </Card.Body>
            </Card>

            <CopyToClipboard
                text={this.props.encrypt.encrypted}
                onCopy={() => this.setState({copied: true})}>
                  <Button style={{marginRight: 10}}>Copy to clipboard</Button>
             </CopyToClipboard>
            <Button
                onClick={() => this.props.encryptInit()}
                style={{marginRight: 10}}
            >New Text</Button>
            {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}

        </Container>
      </div>

    );

    }

};


export default connect(state => state, actions)(WriteSuccess);
