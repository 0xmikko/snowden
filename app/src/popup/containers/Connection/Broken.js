import React from "react";
import {Container} from "react-bootstrap";


const Broken = (props) => {

    return <Container fluid style={{ paddingLeft: 20, paddingRight: 20, marginTop: 15, overflow: "scroll"}}>
            <h3>Something went wrong</h3>
            It seems that something went wrong. Try to restart your extension.
            Please, do not hesitate and connect me via telegram
            <a href={"https://t.me/@mikael_l"} target={"_blank"}>@mikael_l</a>
            and I'll try to help you with the issue.
            Thank you!
    </Container>
};

export default Broken;