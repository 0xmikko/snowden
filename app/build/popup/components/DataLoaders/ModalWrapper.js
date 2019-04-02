import React, { Component } from "react";
import { Button, Container, Modal } from "react-bootstrap";


class ModalWrapper extends Component {

    state = {
      show: false,
      component: undefined
        };

    handleClose =() => {
        this.setState({ show: false, component: null });
    }

    handleShow = () => {
        this.setState({ show: true, component: this.props.component });
    }

    onDataUpdate = () => {
        this.handleClose()
        this.updateData()
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState != this.state;
    }

    render() {

    console.log("STATE_U", this.state)
    const { children } = this.props;

    const childrenWithProps = (this.state.show) ? React.Children.map(children, child =>
          React.cloneElement(child, { onClick: this.handleShow  })) : undefined;

    return (
      <>

        <Button onClick={this.handleShow}/>
          {/*onClick={(event) => { deleteItem(event,  props.id )} } />
        <Button variant="primary" }>
          Launch demo modal
        </Button>*/}

        <Modal show={this.state.show} onHide={this.handleClose} centered size={"lg"}>
          <Modal.Header closeButton>
            <Modal.Title>{ this.props.title }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              { this.state.component }
          </Modal.Body>
            {/*
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Отменить
            </Button>
            <Button variant="danger" onClick={this.handleDelete}>
              Удалить
            </Button>
          </Modal.Footer>*/}
        </Modal>
      </>
    );
  }
}



export default ModalWrapper;