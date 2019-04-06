import React from "react";
import {Container} from "react-bootstrap";


const InstallGuide = (props) => {

    const host_link =  "https://nusnowden.herokuapp.com/host?ext_id=" + props.connection.ext_id;

    return <Container fluid style={{ paddingLeft: 20, paddingRight: 20, marginTop: 15, overflow: "scroll"}}>
            <h3>Host app is not detected</h3>
            Don't panic! This extension requires host app. Please install it.<br />
            <h5 style={{marginTop: 15}}>How to install host app</h5>
            <ol type={"1"}>
                <li>Download .zip by following this link: <a href={host_link}>{host_link}</a></li>
                <li>Unpack it</li>
                <li>Run "sh ./setup.sh </li>
                <li>Restart your Chrome extension</li>
            </ol>
            <h5>Requirements</h5>
            To use this host app you need:
            <ul>
                <li>python 3.6 or higher</li>
                <li>pip and virtualenv installed</li>
            </ul>
            <h5>Still have problems?</h5>
            Please, do not hesitate and connect me via telegram
            <a href={"https://t.me/@mikael_l"} target={"_blank"}>@mikael_l</a>
            and I'll try to help you with installation.
            <br /><br/>
            Thank you and good luck!
    </Container>
};

export default InstallGuide;