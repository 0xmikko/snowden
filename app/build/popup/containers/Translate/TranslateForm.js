import React, { Component } from "react";
import * as Yup from 'yup';
import {Card, Tab, Nav, Container, Row, Button, Col, ListGroup, Form, InputGroup} from "react-bootstrap";
import FormikForm from "../../components/Forms/FormikForm"


class DealForm extends Component {

    render() {

         const fieldsList = {
          source: {
              title: 'Post to encrypt',
              sm: 12,
              type: 'textarea',
              validation: Yup.string().required('Required')
          },

        };

        return (
            <div>

            <Container fluid style={{ paddingLeft: 20, paddingRight: 20, marginTop: 15}}>
            <h3>Translate</h3>


            <FormikForm fieldList = {fieldsList}
                        onSubmit = {this.onSubmit}
                        initialValues = {this.props.data}
                        onSuccessLink = {this.props.onSuccessLink}
                        {...this.props}
              />
        </Container>
      </div>

    );

    }

};


export default DealForm;
