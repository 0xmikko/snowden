import React from "react";
import {Container, Col, Row} from "react-bootstrap"
import './Footer.css'

const footer = ( props ) => (
        <footer className="footer navbar-fixed-bottom">
            <Container style={{backgroundColor: "#DDDDDD"}}>
                        2019 ©  <a href="http://t.me/mikael_l" target="_blank" rel="noopener noreferrer">Mikhail Lazarev</a>, All rights reserved
            </Container>
        </footer>);


export default footer;
