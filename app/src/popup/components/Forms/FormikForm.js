import React, { Component } from "react";
import { Formik, Field } from 'formik/dist/index';
import * as yup from 'yup';
import {Card, Tab, Nav, Container, Row, Button, Col, ListGroup, Form, InputGroup} from "react-bootstrap";
//import {getHashUpdates} from "../../reducers";
//import * as actions from "../../actions/dataLoader";
import {connect} from "react-redux";
import * as status from "../../config";
import {Redirect} from "react-router";
//import TypeAhead from './TypeAhead'


const InputField = (props) => (
    <Form.Group as={Col} md={props.sm}>
        <Form.Label>{ props.title }</Form.Label>
            <Form.Control
                as = { props.as }
                type = { props.type }
                name = { props.name }
                value = {props.values[props.name]}
                onChange = {props.handleChange}
                isInvalid = {!!props.errors[props.name]}
              />
        <Form.Control.Feedback type="invalid">
          { props.errors[props.name]}
        </Form.Control.Feedback>
    </Form.Group>

)

const CheckBoxField = (props) => {
    return <Form.Group as={Col} md={props.sm}>
        <Form.Label>&nbsp;</Form.Label>
        <Form.Check
            label={props.title}
            {...props}
            checked={props.values[props.name]}
            onChange={() => props.setFieldValue(props.name, !props.values[props.name])}
        />
    </Form.Group>
};

/*
const SelectTypeAhead = (props) => {
    return  <Form.Group as={Col} md={props.sm}>
        <Form.Label>{ props.title }</Form.Label>
            <TypeAhead resource={props.resource} api={props.api} {...props}/>
    </Form.Group>
}
*/

class FormikForm extends Component {

    state = {
        status: status.STATUS_ACTIVE,
        hashSent: 0
    }

    onSubmit = (values) => {

        console.log("FFF-FORM", values)

        const hashSent = 'ForMIK' +  this.props.resource + this.props.id + Date();
        this.setState({status: status.STATUS_LOADING, hashSent: hashSent})
        this.props.updateDetail(this.props.api, this.props.resource, this.props.id, values, hashSent);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const hash = this.state.hashSent;
        if (hash === 0) return;
        if ((this.props.hashUpdates[hash] !== undefined) && (this.state.status === status.STATUS_LOADING)) {
            this.setState({status: status.STATUS_SUCCESS, hashSent: 0})
        }

    }



    render() {

        if (this.state.status === status.STATUS_SUCCESS) {
            if (this.updateData) { this.updateData(); }
            else return <Redirect to={this.props.onSuccessLink}/>
        }

        const schemaPrep = {};
        Object.entries(this.props.fieldList).map(x => schemaPrep[x[0]] = x[1].validation);

        const schema = yup.object({...schemaPrep})
        let submitButtonLabel = "Save"
        if (this.props.submitButtonLabel !== undefined) submitButtonLabel = this.props.submitButtonLabel;
        return (
            <Formik
              validationSchema = {schema}
              onSubmit = { this.onSubmit }
              initialValues = {{ ...this.props.initialValues }}

              render={ props => {
                  const fields = Object.entries(this.props.fieldList).map(field => {
                       const key = field[0];
                       const value = field[1];
                       const type = field[1].type || "text";
                       const inputProps = {
                           name: key,
                           type: type,
                           title: value.title,
                           sm: value.sm || 12,
                           key,
                           ...props,
                           ...field[1]
                       }

                       switch(type){
                           case 'text':
                           case 'password':

                               return <InputField {...inputProps } />

                           case 'select':
                               return <InputField {...inputProps } />


                           case 'textarea':
                               return <InputField {...inputProps } as={'textarea'}/>

                           //case 'autocomplete':
                           //    return <SelectTypeAhead {...inputProps}/>

                           case 'checkbox':
                               return <CheckBoxField {...inputProps}/>

                       }

                      });

                  return <Form noValidate onSubmit={props.handleSubmit}>
                      <Form.Row>
                          { fields }
                      </Form.Row>
                      <Button type="submit">{submitButtonLabel}</Button>
                  </Form>
              }
              }
            />

    );
        }



};

const mapStateToProps = (state) => ({
    //hashUpdates:          getHashUpdates(state),

});

const mapDispatchToProps = dispatch => ({
      //updateDetail:      (api, resource, id, file, hashSent) => dispatch(actions.updateDataLoaderDetail(api, resource, id, file, hashSent)),

});

export default  connect(mapStateToProps, mapDispatchToProps)(FormikForm)

