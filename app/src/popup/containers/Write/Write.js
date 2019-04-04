import React, { Component } from "react";
import {connect} from "react-redux";

import * as status from "../../../utils/status";
import * as actions from "../../actions/encrypt";

import WriteForm from "./WriteForm";
import WriteSuccess from "./WriteSuccess";


class Write extends Component {

    render() {

        switch (this.props.encrypt.status) {
            case undefined:
                actions.encryptInit();
                return "Loading";

            case status.STATUS_ACTIVE:
            case status.STATUS_LOADING:

                return <WriteForm {...this.props} />

            case status.STATUS_SUCCESS:
                return <WriteSuccess {...this.props}/>

            case status.STATUS_FAILURE:
                return "Oops, someting fails.."
        }


    }

};


export default connect(state => state, actions)(Write);
