import React, { Component } from "react";
import {connect} from "react-redux";

import * as actions from "../../actions/encrypt";
import * as status from "../../../utils/status";

import ReadSuccess from "./ReadSuccess";
import ReadEmpty from "./ReadEmpty";


class Read extends Component {

    render() {

        console.log("READER", this.props)
        switch (this.props.decrypt.status) {

            case status.STATUS_SUCCESS:
                return <ReadSuccess />

            case status.STATUS_FAILURE:
                return "Oops, someting fails.."

            default:
                return <ReadEmpty />
        }


    }

};


export default connect(state => state, actions)(Read);
