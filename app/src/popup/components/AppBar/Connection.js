import React from "react";
import {Nav, NavDropdown, Form, Navbar, Container} from 'react-bootstrap';
import { Link } from "route-lite";
import App from "../../containers/App";
import "./AppBar.css"


const AppBar = (props) => {

    return (
        <Container fluid style={{backgroundColor: "#F0F0FF", paddingLeft: 20, paddingRight:40}}>
            <Navbar style={{textColor: "#000000", paddingLeft: 20, paddingRight:40, }}>

                <b>Oops...</b>

            </Navbar>
        </Container>
            )

}


export default AppBar;
