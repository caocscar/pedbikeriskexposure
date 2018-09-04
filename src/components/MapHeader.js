import React from "react";
import { Image, Segment, Divider, Container, Button } from "semantic-ui-react";
import Contact from "./Contact";

const MapHeader = props => {
  return (
    <Segment clearing>
      <Button
        floated="left"
        toggle
        active={props.filterActive}
        onClick={props.handleMenuClick}
      >
        Filters
      </Button>
      <Contact />
      <Container textAlign="center">
        <div className="site-logo">
          <Image src="./img/MDOT_logo.jpg" size="tiny" />
          <Divider fitted hidden />
          <Divider fitted hidden />
          <Divider fitted hidden />
          <Image src="./img/TZD_logo.jpg" size="tiny" />
        </div>
        <span className="site-title">
          Pedestrian and Bicyclist Safety Risk Assessment Tool
        </span>
      </Container>
    </Segment>
  );
};

export default MapHeader;
