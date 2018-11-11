import React from "react";
import { locations } from "./../data/locations";
import { Dropdown, Segment } from "semantic-ui-react";
const locationSearch = (options, query) => {
  const re = new RegExp("^" + query, "i");
  return options.filter(opt => re.test(opt.text));
};

const LocationFilter = props => {
  return (
    <Segment className="filter-segment">
      <Dropdown
        onChange={props.handleLocationSearch}
        placeholder="County or MDOT Region"
        search={locationSearch}
        selection
        options={locations}
        value={props.locationID}
      />
    </Segment>
  );
};

export default LocationFilter;
