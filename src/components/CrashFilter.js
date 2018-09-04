import React, { Fragment } from "react";
import { Form, Checkbox, Segment, Popup, Icon } from "semantic-ui-react";
import Toggle from "react-toggle";

const CrashFilter = props => {
  return (
    <Fragment>
      <Segment className="filter-segment" clearing>
        <Segment floated="left" className="filter-segment paz">
          Show crash points?
        </Segment>
        <Segment floated="right" className="filter-segment paz">
          <Toggle
            onChange={props.handleCrashToggle}
            defaultChecked={props.showCrash}
          />
        </Segment>
      </Segment>
      {props.showCrash && (
        <Segment className="filter-segment paz-text" clearing>
          <Form>
            <Form.Field>Select at least one crash variable:</Form.Field>
            <Form.Field>
              <Checkbox
                label="Pedestrian Crash"
                name="radioGroup"
                value="pedestrian"
                checked={props.pedCrashChecked}
                onChange={props.handlePedCrashChange}
              />
              <Popup
                size="tiny"
                trigger={<Icon name="info circle" color="blue" />}
                content="Source: MTCF 2005-2015"
                position="top center"
                inverted
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label="Bicycle Crash"
                name="radioGroup"
                value="bike"
                checked={props.bikeCrashChecked}
                onChange={props.handleBikeCrashChange}
              />
              <Popup
                size="tiny"
                trigger={<Icon name="info circle" color="blue" />}
                content="Source: MTCF 2005-2015"
                position="top center"
                inverted
              />
            </Form.Field>
          </Form>
        </Segment>
      )}
    </Fragment>
  );
};

export default CrashFilter;
