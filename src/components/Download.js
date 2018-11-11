/*eslint default-case: "off"*/
import React, { Component } from "react";
import { Dropdown, Segment, Button } from "semantic-ui-react";
import axios from "axios";
import { getPazTableID, getRoadTableID,getLocationName,getDownloadLayer } from "./helpers";
import { downloadOptions } from "./../data/filterOptions";
class Download extends Component {
  handleLayerChange = (e, { value }) => {
    this.selectedLayer = value;
  };
  handleDownload = () => {
    let query, url;
    if (!this.selectedLayer) {
      alert("Please select at least one layer.");
      return;
    }

    switch (this.selectedLayer) {
      case 1:
        if (!this.props.PazLayerOptions) {
          alert(
            "Please turn on the PAZ layer and choose variables to download."
          );
          return;
        }
        query = `select * from ${this.props.PazLayerOptions.query.from} where ${
          this.props.PazLayerOptions.query.where
        }`;
        url =
          "https://www.googleapis.com/fusiontables/v2/query?sql=" +
          query +
        `&alt=csv&&key=${process.env.REACT_APP_FUSION_TABLE_API_KEY}`;
        break;
      case 2:
        if (!this.props.RoadLayerOptions) {
          alert(
            "Please turn on the road layer and choose variables to download."
          );
          return;
        }
        query = `select * from ${
          this.props.RoadLayerOptions.query.from
        } where ${this.props.RoadLayerOptions.query.where}`;
        url =
          "https://www.googleapis.com/fusiontables/v2/query?sql=" +
          query +
          `&alt=csv&&key=${process.env.REACT_APP_FUSION_TABLE_API_KEY}`;
        break;
      case 3:
        if (!this.props.CrashLayerOptions) {
          alert(
            "Please turn on the crash layer and choose variables to download."
          );
          return;
        }
        query = `select * from ${
          this.props.CrashLayerOptions.query.from
        } where ${this.props.CrashLayerOptions.query.where}`;
        url =
          "https://www.googleapis.com/fusiontables/v2/query?sql=" +
          query +
          `&alt=csv&&key=${process.env.REACT_APP_FUSION_TABLE_API_KEY}`;
        break;
      case 4:
        if (!this.props.PointLayerOptions) {
          alert(
            "Please turn on the point layer and choose variables to download."
          );
          return;
        }
        query = `select * from ${
          this.props.PointLayerOptions.query.from
        } where ${this.props.PointLayerOptions.query.where}`;
        url = "https://www.googleapis.com/fusiontables/v2/query?sql=" + query + `&alt=csv&&key=${process.env.REACT_APP_FUSION_TABLE_API_KEY}`;   
        break;
    }

    axios({
      url,
      method: "GET",
      responseType: "blob" 
    })
      .then(res => {
                     let location = getLocationName(this.props.locationID);
                     location = /(\w+)\s/g
                       .exec(location)[0]
                       .replace(" ", "");
                     const filename = `${location}_${getDownloadLayer(this.selectedLayer)}.csv`;
                     const blob = new Blob([res.data], {
                       type: "text/csv;charset=utf-8;"
                     });
                     if (navigator.msSaveBlob) {
                       // IE 10+
                       navigator.msSaveBlob(blob, filename);
                     } else {
                       const link = document.createElement("a");
                       if (link.download !== undefined) {
                         // feature detection
                         // Browsers that support HTML5 download attribute
                         let donwloadUrl = URL.createObjectURL(blob);
                         link.setAttribute("href", donwloadUrl);
                         link.setAttribute("download", filename);
                         link.style.visibility = "hidden";
                         document.body.appendChild(link);
                         link.click();
                         document.body.removeChild(link);
                       }
                     }
                     this.props.ReactGA.event({ category: "Download", action: `Successfully downloaded ${filename}`,label:`${url}`});
                   })
      .catch(error => {
        let tableID;
        if (error.request.status === 503) {
          if (this.selectedLayer === 1) {
            tableID = getPazTableID(this.props.locationID);
            alert(
              "File is too big to download. Please access the fusion table directly at https://fusiontables.google.com/DataSource?docid=" +
                tableID
            );
          } else if (this.selectedLayer === 2) {
            tableID = getRoadTableID(this.props.locationID, this.props.roadVar);
            alert(
              "File is too big to download. Please access the fusion table directly at https://fusiontables.google.com/DataSource?docid=" +
                tableID
            );
          } else {
            tableID = "1WYNs_bniznkgQMwU - lhxstOJ7vlTvVggXSV4TMUh";
            alert(
              "File is too big to download. Please access the fusion table directly at https://fusiontables.google.com/DataSource?docid=" +
                tableID
            );
          }
          this.props.ReactGA.event({ category: "Download", action: `download fail, file too big`, label: `${url}` });

        }
      });
  };
  render() {
    return (
      <div>
        <Segment className="filter-segment">
          <Dropdown
            onChange={this.handleLayerChange}
            placeholder="Select a layer..."
            selection
            options={downloadOptions}
          />
        </Segment>
        <Button
          onClick={this.handleDownload}
          size="small"
          icon="cloud download"
          content="Download"
          color="blue"
          labelPosition="left"
          style={{ marginTop: "20px" }}
        />
      </div>
    );
  }
}

export default Download;
