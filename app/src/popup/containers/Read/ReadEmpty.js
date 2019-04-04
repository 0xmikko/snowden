
import React, { Component } from "react";
import {Card, Tab, Nav, Container, Row, Button, Col, ListGroup, Form, InputGroup} from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../../actions/encrypt";


class ReadEmpty extends Component {

    render() {

        return (
            <div>

            <Container fluid style={{ paddingLeft: 20, paddingRight: 20, marginTop: 15}}>
            <h3>Nothing was found</h3>
                When we found encrypted posts in your Facebook feed, they will automatically appeared here and your
                could check as badge on icon.
        </Container>
      </div>

    );

    }

};


export default connect(state => state, actions)(ReadEmpty);
