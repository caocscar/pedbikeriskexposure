import React from "react";
import { Menu, Header, Popup, Icon } from "semantic-ui-react";
import LocationFilter from "./LocationFilter";
import PazFilter from "./PazFilter";
import RoadFilter from "./RoadFilter";
import PointFilter from "./PointFilter";
import CrashFilter from "./CrashFilter";
import Download from "./Download";
const Filters = props => (
  <div>
    <Menu.Item>
      <Header as="h4">
        Location
        <Popup
          size="tiny"
          trigger={<Icon name="info circle" color="blue" />}
          content="Location could be a county or MDOT region."
          position="top center"
          inverted
        />
      </Header>
      <LocationFilter
        handleLocationSearch={props.handleLocationSearch}
        locationID={props.locationID}
      />
    </Menu.Item>
    <Menu.Item>
      <Header as="h4">
        Pedestrian Analysis Zone
        <Popup
          size="tiny"
          trigger={<Icon name="info circle" color="blue" />}
          content="Pedestrian Analysis Zone (PAZ) is a 400-meters-by-400-meters unit of analysis."
          position="top center"
          inverted
        />
      </Header>
      <PazFilter
        handlePazChange={props.handlePazChange}
        handleRankChange={props.handleRankChange}
        handlePazToggle={props.handlePazToggle}
        showPaz={props.showPaz}
        pazVar={props.pazVar}
        pazRank={props.pazRank}
      />
    </Menu.Item>
    <Menu.Item>
      <Header as="h4">Road</Header>
      <RoadFilter
        handleRoadToggle={props.handleRoadToggle}
        handleRoadChange={props.handleRoadChange}
        roadVar={props.roadVar}
        showRoad={props.showRoad}
      />
    </Menu.Item>
    <Menu.Item>
      <Header as="h4">Crash</Header>
      <CrashFilter
        handleCrashToggle={props.handleCrashToggle}
        handlePedCrashChange={props.handlePedCrashChange}
        handleBikeCrashChange={props.handleBikeCrashChange}
        showCrash={props.showCrash}
        pedCrashChecked={props.pedCrashChecked}
        bikeCrashChecked={props.bikeCrashChecked}
      />
    </Menu.Item>
    <Menu.Item>
      <Header as="h4">Points of Interest</Header>
      <PointFilter
        showPoint={props.showPoint}
        handlePointToggle={props.handlePointToggle}
        schoolPointChecked={props.schoolPointChecked}
        barPointChecked={props.barPointChecked}
        handleSchoolPointChange={props.handleSchoolPointChange}
        handleBarPointChange={props.handleBarPointChange}
      />
    </Menu.Item>
    <Menu.Item>
      <Header as="h4">
        Download Data
        <Popup
          size="tiny"
          trigger={<Icon name="info circle" color="blue" />}
          content="Format is CSV. Geometry is KML style."
          position="top center"
          inverted
        />
      </Header>
      <Download {...props} />
    </Menu.Item>
  </div>
);

export default Filters;
