import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";

class Contact extends Component {
  render() {
    return (
      <Modal
        trigger={
          <Button floated="right" color={"green"}>
            Contact
          </Button>
        }
        closeIcon
        size="tiny"
        dimmer={"inverted"}
      >
        <Modal.Content>
          <p>
            If you have any question or feedback for the tool please contact:
          </p>
          <p>
            <strong>Carissa McQuiston, P.E.</strong>
            <br />
            McQuistonC@michigan.gov
            <br />
            Non-Motorized Safety Engineering Specialist
            <br />
            RSA Program Manager SHSP Engineer
            <br />
            MDOT Safety Programs Unit
          </p>
        </Modal.Content>
      </Modal>
    );
  }
}

export default Contact;
