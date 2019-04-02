import React from "react";
import {Button, Modal} from "react-bootstrap";


function Confirmation(props) {
    return (
        <Modal show={props.show} onHide={props.onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onCancel}>
                    Отменить
                </Button>
                <Button variant="danger" onClick={props.onAction}>
                    {props.actionName}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default Confirmation;