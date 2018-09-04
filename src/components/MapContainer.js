import React, { Component } from "react";
import { GoogleApiWrapper, Map } from "google-maps-react";
import { getZoomLevel, getCenter } from "./helpers";
import FusionTableLayer from "./FusionTableLayer";

class MapContainer extends Component {
  state = { center: {} };
  componentDidUpdate(pp, ps) {
    if (pp.locationID !== this.props.locationID) {
      this.setState(() => ({ center: getCenter(this.props.locationID) }));
    }
  }
  centerMoved = (mapProps, map) => {
    const lat = map.getCenter().lat();
    const lng = map.getCenter().lng();
    this.setState(() => ({ center: { lat, lng } }));
  };
  handleStreetViewChange = (mapProps, map) => {
    mapProps.google.maps.event.addListener(
      map.getStreetView(),
      "visible_changed",
      this.props.handleViewChange
    );
  };
  render() {
    return (
      <Map
        google={this.props.google}
        initialCenter={getCenter(this.props.locationID)}
        center={this.state.center}
        zoom={getZoomLevel(this.props.locationID)}
        onDragend={this.centerMoved}
        onReady={this.handleStreetViewChange}
        style={{ height: this.props.mapHeight }}
      >
        {this.props.showPaz && (
          <FusionTableLayer layerOption={this.props.PazLayerOptions} />
        )}
        {this.props.showRoad && (
          <FusionTableLayer layerOption={this.props.RoadLayerOptions} />
        )}
        {this.props.showCrash && (
          <FusionTableLayer layerOption={this.props.CrashLayerOptions} />
        )}
        {this.props.showPoint && (
          <FusionTableLayer layerOption={this.props.PointLayerOptions} />
        )}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDny-AaZwZEw5j-jUcfwiBMS2fch0dg4dI"
})(MapContainer);
