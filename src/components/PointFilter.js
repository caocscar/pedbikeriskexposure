import React, { Fragment } from "react";
import { Form, Checkbox, Segment } from "semantic-ui-react";
import Toggle from "react-toggle";

const PointFilter = props => {
  return (
    <Fragment>
      <Segment className="filter-segment" clearing>
        <Segment floated="left" className="filter-segment paz">
          Show points of interest?
        </Segment>
        <Segment floated="right" className="filter-segment paz">
          <Toggle
            onChange={props.handlePointToggle}
            defaultChecked={props.showPoint}
          />
        </Segment>
      </Segment>
      {props.showPoint && (
        <Segment className="filter-segment paz-text" clearing>
          <Form>
            <Form.Field>Select at least one point variable:</Form.Field>
            <Form.Field>
              <Checkbox
                label="Schools"
                name="radioGroup"
                value="schools"
                checked={props.schoolPointChecked}
                onChange={props.handleSchoolPointChange}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label="Bars"
                name="radioGroup"
                value="bars"
                checked={props.barPointChecked}
                onChange={props.handleBarPointChange}
              />
            </Form.Field>
          </Form>
        </Segment>
      )}
    </Fragment>
  );
};

export default PointFilter;
