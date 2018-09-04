import React, { Component } from "react";
import MapContainer from "./components/MapContainer";
import { Menu, Segment, Sidebar, Grid, Header } from "semantic-ui-react";
import {
  getPazTableID,
  getLocationFilter,
  getRankingFilter,
  getRoadTableID,
  getPointFilter
} from "./components/helpers";
import { PAZOptions } from "./data/filterOptions";
import MapHeader from "./components/MapHeader";
import Filters from "./components/Filters";
import Legend from "./components/Legend";
import "./App.css";

class App extends Component {
  state = {
    locationID: 161,
    showPaz: true,
    pazVar: 2,
    pazRank: 10000,
    showRoad: false,
    roadVar: 1,
    showCrash: false,
    showPoint: false,
    pedCrashChecked: true,
    bikeCrashChecked: true,
    schoolPointChecked: true,
    barPointChecked: true,
    isStreetview: false,
    sideBarVisible: false,
    filterActive: false,
    mapHeight: null
  };

  header = React.createRef();

  componentDidUpdate(pp, ps) {
    if (
      this.state.pedCrashChecked === false &&
      this.state.bikeCrashChecked === false
    ) {
      alert("Please select at least one crash variable.");
      this.setState(() => ({ pedCrashChecked: true }));
    }
    if (
      this.state.schoolPointChecked === false &&
      this.state.barPointChecked === false
    ) {
      alert("Please select at least one crash variable.");
      this.setState(() => ({ schoolPointChecked: true }));
    }
  }

  componentDidMount() {
    this.updateMapHeight();
    window.addEventListener("resize", this.updateMapHeight);
  }

  updateMapHeight = () => {
    this.setState(() => ({
      mapHeight: window.innerHeight - this.header.current.clientHeight
    }));
  };

  getLegendData = () => {
    let legends = [];
    if (this.state.showPaz) {
      legends.push({
        type: "paz",
        var: this.state.pazVar,
        title: PAZOptions.filter(opt => opt.value === this.state.pazVar)[0].text
      });
    }
    if (this.state.showRoad) {
      legends.push({
        type: "road",
        var: this.state.roadVar,
        title:
          this.state.roadVar === 1 ? "Pedestrian Exposure" : "Bicycle Exposure"
      });
    }
    if (this.state.showCrash || this.state.showPoint) {
      legends.push({ type: "point", title: "Points" });
    }
    return legends;
  };

  getPazLayerOptions = () => {
    return (
      this.state.showPaz && {
        query: {
          select: "geometry",
          from: getPazTableID(this.state.locationID),
          where: `${getLocationFilter(
            this.state.locationID
          )} AND ${getRankingFilter(this.state.pazVar, this.state.pazRank)}`
        },
        options: { styleId: this.state.pazVar }
      }
    );
  };
  getRoadLayerOptions = () => {
    return (
      this.state.showRoad && {
        query: {
          select: "geometry",
          from: getRoadTableID(this.state.locationID, this.state.roadVar),
          where: getLocationFilter(this.state.locationID)
        },
        options: { styleId: 2 }
      }
    );
  };
  getCrashLayerOptions = () => {
    let crashVars = [];
    if (this.state.pedCrashChecked) crashVars.push("pedestrian");
    if (this.state.bikeCrashChecked) crashVars.push("bike");
    return (
      this.state.showCrash && {
        query: {
          select: "geometry",
          from: "1WYNs_bniznkgQMwU-lhxstOJ7vlTvVggXSV4TMUh",
          where: `${getLocationFilter(
            this.state.locationID
          )} AND ${getPointFilter(crashVars)}`
        },
        options: { styleId: 2 }
      }
    );
  };
  getPointLayerOptions = () => {
    let pointVars = [];
    if (this.state.schoolPointChecked) pointVars.push("schools");
    if (this.state.barPointChecked) pointVars.push("bars");
    return (
      this.state.showPoint && {
        query: {
          select: "geometry",
          from: "1WYNs_bniznkgQMwU-lhxstOJ7vlTvVggXSV4TMUh",
          where: `${getLocationFilter(
            this.state.locationID
          )} AND ${getPointFilter(pointVars)}`
        },
        options: { styleId: 2 }
      }
    );
  };

  handleViewChange = () => {
    this.setState(prevState => ({
      isStreetview: !prevState.isStreetview
    }));
  };

  handleLocationSearch = (e, { value }) => {
    this.setState(() => ({ locationID: value }));
  };

  handleMenuClick = () => {
    this.setState(prevState => ({
      sideBarVisible: !prevState.sideBarVisible,
      filterActive: !prevState.filterActive
    }));
  };

  handlePazToggle = () => {
    this.setState(ps => ({ showPaz: !ps.showPaz }));
  };
  handleRoadToggle = () => {
    this.setState(ps => ({ showRoad: !ps.showRoad }));
  };
  handleCrashToggle = () => {
    this.setState(ps => ({ showCrash: !ps.showCrash }));
  };
  handlePointToggle = () => {
    this.setState(ps => ({ showPoint: !ps.showPoint }));
  };

  handleRoadChange = (e, { value }) => {
    this.setState(() => ({ roadVar: value }));
  };

  handlePedCrashChange = () => {
    this.setState(ps => ({
      pedCrashChecked: !ps.pedCrashChecked
    }));
  };
  handleBikeCrashChange = () => {
    this.setState(ps => ({
      bikeCrashChecked: !ps.bikeCrashChecked
    }));
  };
  handleSchoolPointChange = () => {
    this.setState(ps => ({
      schoolPointChecked: !ps.schoolPointChecked
    }));
  };
  handleBarPointChange = () => {
    this.setState(ps => ({
      barPointChecked: !ps.barPointChecked
    }));
  };

  handleRankChange = (e, { value }) => {
    this.setState(() => ({ pazRank: value }));
  };

  handlePazChange = (e, { value }) => {
    this.setState(() => ({ pazVar: value }));
  };

  render() {
    const mapHeight = this.state.isStreetview
      ? "100%"
      : this.state.mapHeight + "px";

    const legends = this.getLegendData();

    return (
      <div className="app-container">
        <div ref={this.header}>
          <MapHeader
            handleMenuClick={this.handleMenuClick}
            filterActive={this.state.filterActive}
          />
        </div>

        <Sidebar.Pushable
          as={Segment}
          color="green"
          style={{ height: mapHeight }}
        >
          <Sidebar
            as={Menu}
            animation="push"
            icon="labeled"
            vertical
            visible={this.state.sideBarVisible}
            width="wide"
          >
            <Filters
              {...this.state}
              PazLayerOptions={this.getPazLayerOptions()}
              RoadLayerOptions={this.getRoadLayerOptions()}
              CrashLayerOptions={this.getCrashLayerOptions()}
              PointLayerOptions={this.getPointLayerOptions()}
              handleLocationSearch={this.handleLocationSearch}
              handlePazToggle={this.handlePazToggle}
              handleRankChange={this.handleRankChange}
              handlePazChange={this.handlePazChange}
              handleRoadToggle={this.handleRoadToggle}
              handleRoadChange={this.handleRoadChange}
              handleCrashToggle={this.handleCrashToggle}
              handlePedCrashChange={this.handlePedCrashChange}
              handleBikeCrashChange={this.handleBikeCrashChange}
              handlePointToggle={this.handlePointToggle}
              handleBarPointChange={this.handleBarPointChange}
              handleSchoolPointChange={this.handleSchoolPointChange}
            />
          </Sidebar>

          <Sidebar.Pusher>
            <MapContainer
              {...this.state}
              PazLayerOptions={this.getPazLayerOptions()}
              RoadLayerOptions={this.getRoadLayerOptions()}
              CrashLayerOptions={this.getCrashLayerOptions()}
              PointLayerOptions={this.getPointLayerOptions()}
              handleViewChange={this.handleViewChange}
              mapHeight={mapHeight}
            />

            <div
              className="legend"
              style={{ width: `${legends.length * 175}px` }}
            >
              <Grid
                columns={legends.length === 0 ? "equal" : legends.length}
                celled
                style={{ backgroundColor: "#fff" }}
              >
                {legends.map((legend, i) => {
                  return (
                    <Grid.Column key={i}>
                      <Header as="h5">{legend.title}</Header>
                      <Legend {...legend} />
                    </Grid.Column>
                  );
                })}
              </Grid>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App;
