import React, { Component } from "react";
import { connect } from "react-redux"
import { MdDelete } from "react-icons/md/index";
import * as actions from "../../actions/dataLoader";
import * as status from "../../config";
import {getHashUpdates} from "../../reducers";
import Confirmation from "./Confirmation"


class UpdateWithConfirmation extends Component {

    state = {
        show: false,
        hashSent: 0
    };

    componentDidUpdate(prevProps, prevState, snapshot) {

        const hash = this.state.hashSent;
        if (hash === 0) return;
        if (this.props.hashUpdates[hash] !== undefined) {
            this.setState({ hashSent: 0})
            if ((this.props.onSuccessURL) && (this.props.history)) {
                this.props.history.push(this.props.onSuccessURL)
            } else {
                this.props.updateData()
            }
        }
    }

    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });

    handleDelete = () => {
        this.handleClose()
        const hashSent = this.props.hashPrefix +  this.props.api + this.props.id + Date();
        this.setState({status: status.STATUS_LOADING, hashSent: hashSent})
        this.props.onAction(hashSent)
    }

    render() {
        const Icon = this.props.buttonComponent
        return (
            <>
                <Icon onClick={this.handleShow} />

                <Confirmation
                    title={this.props.title}
                    body={this.props.body}
                    show={this.state.show}
                    onCancel={this.handleClose}
                    onAction={this.handleDelete}
                    actionName={this.props.actionName}
                    />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    hashUpdates:          getHashUpdates(state),
});


export default connect(mapStateToProps, null)(UpdateWithConfirmation);