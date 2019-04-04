
import React, { Component } from "react";
import {Card, Tab, Nav, Container, Row, Button, Col, ListGroup, Form, InputGroup} from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../../actions/encrypt";


class TranslateSuccess extends Component {
    state={
        copied: false
    }


    render() {

        let posts;
        if (this.props.decrypt.decrypted) posts = this.props.decrypt.decrypted.map(post => (
            <Card style={{marginBottom: 10}}>
                <Card.Body>
                     {post}
                </Card.Body>
            </Card>
        ))

        return (
            <div>

            <Container fluid style={{ paddingLeft: 20, paddingRight: 20, marginTop: 15}}>
            <h3>Found post</h3>
                {posts}
        </Container>
      </div>

    );

    }

};


export default connect(state => state, actions)(TranslateSuccess);
