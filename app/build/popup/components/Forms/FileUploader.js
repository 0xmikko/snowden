import React, { Component } from "react";
import Upload from "rc-upload";
import { Button, Container } from "react-bootstrap";
import * as actions from "../../actions/dataLoader";
import * as status from "../../config";
import { connect } from "react-redux";
import { getHashUpdates } from "../../reducers";


class FileUploader extends Component {

    state = {
        status: status.STATUS_ACTIVE,
        hashSent: 0
    }

    uploadFile(file) {

        console.log("FFF", file)

        const hashSent = 'FileUpload' +  this.props.resource + this.props.id + Date();
        this.setState({status: status.STATUS_LOADING, hashSent: hashSent})

        let formData = new FormData();
        formData.append("scan", file);

        this.props.uploadFile(this.props.api, this.props.resource, this.props.id, formData, hashSent);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const hash = this.state.hashSent;
        if (hash === 0) return;
        if ((this.props.hashUpdates[hash] !== undefined) && (this.state.status === status.STATUS_LOADING)) {
            this.setState({status: status.STATUS_SUCCESS, hashSent: 0})
            setTimeout(() => this.setState({status: status.STATUS_ACTIVE}), 1500);
        }

    }

    render() {

        const disabled = (this.state.status === status.STATUS_LOADING) || (this.state.status === status.STATUS_SUCCESS);
        const label = (this.state.status === status.STATUS_ACTIVE) ? this.props.label: (this.state.status === status.STATUS_LOADING) ? 'Loading...' : 'Ok';
        const variant = (this.state.status === status.STATUS_SUCCESS) ? "success" : "primary";

        return <Upload
                    customRequest={ ({ file }) => this.uploadFile(file) }>
                    <Button
                        size={"sm"}
                        disabled = { disabled }
                        variant={ variant }
                    >
                        { label }
                    </Button>
                </Upload>
    }
}


const mapStateToProps = (state) => ({
    hashUpdates:          getHashUpdates(state),

});

const mapDispatchToProps = dispatch => ({
     uploadFile:      (api, resource, id, file, hashSent) => dispatch(actions.updateDataLoaderDetail(api, resource, id, file, hashSent)),

});

export default  connect(mapStateToProps, mapDispatchToProps)(FileUploader)