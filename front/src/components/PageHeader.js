import React, { Component } from "react";
import {Container, Media, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getFullAPIAddress} from "../utils/api";
import ComponentSearch from "./ComponentSearch";


export const PageHeader = (props) =>  {

    let image = "";
    if (props.icon) {
        image = <img src={ getFullAPIAddress(props.icon) }
                     height={80}
                     style={{marginRight:20}}
        />
    }

    if (props.back) {
        image = <Link to={props.back}>Back</Link>
    }

    const searchBar = (props.searchBar) ? <ComponentSearch resource={props.resource}/> : undefined;

    return (
            <Container fluid style={{backgroundColor: "#FAFBFC", paddingTop: 15, paddingLeft: 40, paddingRight:40, paddingBottom: 15}}>
                <Media>
                    { image }

                    <Media.Body >
                        <Row>
                            <Col sm={8}>
                                <h3>{ props.header }</h3>
                                <p>{ props.subHeader } </p>
                            </Col>
                            <Col sm={4}>
                                {searchBar}
                            </Col>
                        </Row>
                    </Media.Body>
                </Media>
            </Container>
    );
};


export default PageHeader;