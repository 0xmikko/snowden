import React from "react";
import {Nav, NavDropdown, Form, Navbar, Container} from 'react-bootstrap';
import { Link } from "router-lite";
//import "./AppBar.css"


const AppBar = (props) => {

    const menu = (
        <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Item bsPrefix={'nav-link'} style={{width: "110px"}}><Link to={"/translate/"}>Translate</Link></Nav.Item>
                    <Nav.Item bsPrefix={'nav-link'} style={{width: "110px"}}><Link to={"/readers/"}>Readers</Link></Nav.Item>
                    <Nav.Item bsPrefix={'nav-link'} style={{width: "110px"}}><Link to={"/settings/"}>Settings</Link></Nav.Item>
                </Nav>

              </Navbar.Collapse>
    ) ;

    return (
        <Container fluid style={{backgroundColor: "#F0F0FF", paddingLeft: 20, paddingRight:40}}>
            <Navbar style={{textColor: "#000000", paddingLeft: 20, paddingRight:40, }}>

                { menu }

            </Navbar>
        </Container>
            )

}


export default AppBar;
