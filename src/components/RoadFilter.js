import React, { Component, Fragment } from "react";
import { Form, Radio, Segment, Popup, Icon } from "semantic-ui-react";
import Toggle from "react-toggle";
// Radios in a group must be controlled components.
class RoadFilter extends Component {
  state = { value: 1 };
  handleChange = (e, { value }) => {
    this.setState(() => ({ value }));
    this.props.handleRoadChange(e, { value });
  };
  render() {
    return (
      <Fragment>
        <Segment className="filter-segment" clearing>
          <Segment floated="left" className="filter-segment paz">
            Show road segments?
          </Segment>
          <Segment floated="right" className="filter-segment paz">
            <Toggle
              onChange={this.props.handleRoadToggle}
              defaultChecked={this.props.showRoad}
            />
          </Segment>
        </Segment>
        {this.props.showRoad && (
          <Segment className="filter-segment paz-text" clearing>
            <Form>
              <Form.Field>
                Select a road variable:
                <Popup
                  size="tiny"
                  trigger={<Icon name="info circle" color="blue" />}
                  content="Pedestrian/Bicycle Exposure (trips per day)"
                  position="top center"
                  inverted
                />
              </Form.Field>

              <Form.Field>
                <Radio
                  label="Pedestrian Exposure"
                  name="radioGroup"
                  value={1}
                  checked={this.state.value === 1}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Bicycle Exposure"
                  name="radioGroup"
                  value={2}
                  checked={this.state.value === 2}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Segment>
        )}
      </Fragment>
    );
  }
}

export default RoadFilter;
