import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Container } from "react-bootstrap";

import * as actions from "../../actions/settings";


class Settings extends Component {

    componentDidMount() {
        this.props.getSettings()
    }

    render() {

        return (
            <Container fluid style={{ paddingLeft: 20, paddingRight: 20, marginTop: 15}}>
            <h3>Settings</h3>
                <Card>
                    <Card.Header>Your reader id</Card.Header>
                    <Card.Body>{this.props.settings.reader}</Card.Body>
                </Card>
                <br />
                This is your public key. Use it to join other channels.
                Channel Manager could grant you access if you provide this code. No additional information is required.
            </Container>
        );

    }

};


export default connect(state => state, actions)(Settings);
