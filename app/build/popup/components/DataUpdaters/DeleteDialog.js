import React, { Component } from "react";
import { connect } from "react-redux"
import { MdDelete } from "react-icons/md/index";
import * as actions from "../../actions/dataLoader";
import UpdateWithConfirmation from "./UpdateWithConfirmation"


class DeleteDialog extends Component {

  render() {
    console.log("FOFOFO", this.props)
    return (
      <>
        <UpdateWithConfirmation
            title={"Подтвердите удаление"}
            body={`Вы действительно собираетесь удалить запись ${this.props.id} ? Восстановление будет невозможно!`}
            buttonComponent={MdDelete}
            actionName={"Удалить"}
            onAction={(hash) => this.props.deleteItem(this.props.api, this.props.resource, this.props.id, hash)}
            hashPrefix={'DELETE'}
            {...this.props}
        />
      </>
    );
  }
}


const mapDispatchToProps = dispatch => ({
     deleteItem:      (api, resource, id, hashSent) => dispatch(actions.deleteDetailUpdateParent(api, resource, id, hashSent)),
});


export default connect(null, mapDispatchToProps)(DeleteDialog);