import React, { Component } from "react";
import MapContainer from "./components/MapContainer";
import { Menu, Segment, Sidebar, Grid, Header } from "semantic-ui-react";
import {
  getPazTableID,
  getLocationFilter,
  getRankingFilter,
  getRoadTableID,
  getPointFilter,
  getLocationName,
  getRoadVariable,
  getPazVariable
} from "./components/helpers";
import MapHeader from "./components/MapHeader";
import Filters from "./components/Filters";
import Legend from "./components/Legend";
import ReactGA from "react-ga";
import "./App.css";
require("dotenv").config();

const initializeReactGA = () => {
  ReactGA.initialize(process.env.REACT_APP_GA_ID, {
    cookieDomain: "auto",
    debug: process.env.NODE_ENV === "development" ? true : false
  });
  ReactGA.pageview("/");
};
initializeReactGA();

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
    mapHeight: null,
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
        title: getPazVariable(this.state.pazVar)
      });
    }
    if (this.state.showRoad) {
      legends.push({
        type: "road",
        var: this.state.roadVar,
        title: getRoadVariable(this.state.roadVar)
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
    this.state.isStreetview &&
      ReactGA.event({ category: "Navigation", action: "Used street view" });
  };

  handleLocationSearch = (e, { value }) => {
    this.setState(() => ({ locationID: value }));
    ReactGA.event({
      category: "Filter",
      action: `Searched location: ${getLocationName(value)}`
    });
  };

  handleMenuClick = () => {
    this.setState(
      prevState => ({
        sideBarVisible: !prevState.sideBarVisible,
        filterActive: !prevState.filterActive
      }),
      () => {
        ReactGA.event({
          category: "Filter",
          action: `Switched filter sidebar ${
            this.state.sideBarVisible ? "on" : "off"
          }`
        });
      }
    );
  };

  handlePazToggle = () => {
    this.setState(
      ps => ({ showPaz: !ps.showPaz }),
      () => {
        ReactGA.event({
          category: "Filter",
          action: `Switched paz layer toggle ${
            this.state.showPaz ? "on" : "off"
          }`
        });
      }
    );
  };
  handleRoadToggle = () => {
    this.setState(
      ps => ({ showRoad: !ps.showRoad }),
      () => {
        ReactGA.event({
          category: "Filter",
          action: `Switched road layer toggle ${
            this.state.showRoad ? "on" : "off"
          }`
        });
      }
    );
  };
  handleCrashToggle = () => {
    this.setState(
      ps => ({ showCrash: !ps.showCrash }),
      () => {
        ReactGA.event({
          category: "Filter",
          action: `Switched crash layer toggle ${
            this.state.showCrash ? "on" : "off"
          }`
        });
      }
    );
  };
  handlePointToggle = () => {
    this.setState(
      ps => ({ showPoint: !ps.showPoint }),
      () => {
        ReactGA.event({
          category: "Filter",
          action: `Switched point layer toggle ${
            this.state.showPoint ? "on" : "off"
          }`
        });
      }
    );
  };

  handleRoadChange = (e, { value }) => {
    this.setState(() => ({ roadVar: value }));
    ReactGA.event({
      category: "Filter",
      action: `Selected road variable: ${getRoadVariable(value)}`
    });
  };

  handlePedCrashChange = () => {
    this.setState(
      ps => ({
        pedCrashChecked: !ps.pedCrashChecked
      }),
      () => {
        ReactGA.event({
          category: "Filter",
          action: `${
            this.state.pedCrashChecked ? "checked" : "unchecked"
          } pedestrian crash for crash layer`
        });
      }
    );
  };
  handleBikeCrashChange = () => {
    this.setState(
      ps => ({
        bikeCrashChecked: !ps.bikeCrashChecked
      }),
      () => {
        ReactGA.event({
          category: "Filter",
          action: `${
            this.state.bikeCrashChecked ? "checked" : "unchecked"
          } bike crash for crash layer`
        });
      }
    );
  };
  handleSchoolPointChange = () => {
    this.setState(
      ps => ({
        schoolPointChecked: !ps.schoolPointChecked
      }),
      () => {
        ReactGA.event({
          category: "Filter",
          action: `${
            this.state.schoolPointChecked ? "checked" : "unchecked"
          } school for point layer`
        });
      }
    );
  };
  handleBarPointChange = () => {
    this.setState(
      ps => ({
        barPointChecked: !ps.barPointChecked
      }),
      () => {
        ReactGA.event({
          category: "Filter",
          action: `${
            this.state.barPointChecked ? "checked" : "unchecked"
          } bar for point layer`
        });
      }
    );
  };

  handleRankChange = (e, { value }) => {
    this.setState(() => ({ pazRank: value }));
    ReactGA.event({
      category: "Filter",
      action: `Selected paz rank: ${value}`
    });
  };

  handlePazChange = (e, { value }) => {
    this.setState(() => ({ pazVar: value }));
    ReactGA.event({
      category: "Filter",
      action: `Selected paz variable: ${getPazVariable(value)}`
    });
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
              ReactGA={ReactGA}
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
