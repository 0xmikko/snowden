import React from "react";
import {Container} from "react-bootstrap";

const InstallGuide = (props) => {
    return <Container fluid style={{ paddingLeft: 20, paddingRight: 20, marginTop: 15, overflow: "scroll"}}>
            <h3>Host app is not detected</h3>
            Don't panic! This extension requires host app. Please install it.<br />
            <h5 style={{marginTop: 15}}>How to install host app</h5>
            <ol type={"1"}>
                <li>Download .zip file following this link</li>
                <li>Unpack it</li>
                <li>Run "python ./setup.py </li>
                <li>Restart your Chrome browser</li>
            </ol>
            <h5>Requirements</h5>
            To use this host app you need:
            <ul>
                <li>Python 3.6 or higher</li>
                <li>Pip and virtualenv installed</li>
            </ul>
            <h5>Still have problems?</h5>
        Please, do not hesitate and connect me via telegram <a href={"https://t.me/@mikael_l"} target={"_blank"}>@mikael_l</a> and I'll try to help you with installation.
            <br /><br/>
            Thank you and good luck!
    </Container>
};

export default InstallGuide;