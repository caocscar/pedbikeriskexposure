import React, { Fragment } from "react";
import Toggle from "react-toggle";
import PazPopup from "./PazPopup";
import { Dropdown, Segment } from "semantic-ui-react";
import { PAZOptions, PAZRankOptions } from "./../data/filterOptions";

const PazFilter = props => (
  <Fragment>
    <Segment className="filter-segment" clearing>
      <Segment floated="left" className="filter-segment paz">
        Show PAZ?
      </Segment>
      <Segment floated="right" className="filter-segment paz">
        <Toggle
          onChange={props.handlePazToggle}
          defaultChecked={props.showPaz}
        />
      </Segment>
    </Segment>
    {props.showPaz && (
      <Segment className="filter-segment paz-text" clearing>
        show{" "}
        <Dropdown
          inline
          options={PAZRankOptions}
          defaultValue={props.pazRank}
          onChange={props.handleRankChange}
        />
        PAZs for{" "}
        <Dropdown
          inline
          options={PAZOptions}
          defaultValue={props.pazVar}
          onChange={props.handlePazChange}
        />
        <PazPopup pazVar={props.pazVar} />
      </Segment>
    )}
  </Fragment>
);

export default PazFilter;
