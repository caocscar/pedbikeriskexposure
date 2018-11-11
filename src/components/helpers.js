const CONSTANTS = require("./../data/lookup");
const locationOptions = require("./../data/locations");
const filterOptions = require("./../data/filterOptions")
const counties = require("./../data/counties.json");
const mdotRegions = require("./../data/MDOT.json");
const d3Geo = require("d3-geo");

export function getPazTableID(locationID) {
  for (let key in CONSTANTS.paz) {
    if (CONSTANTS.paz[key].includes(locationID)) {
      const tableKey = `paz${key}`;
      return CONSTANTS.tableLookup[tableKey];
    }
  }
}

export function getRoadTableID(locationID, roadVar) {
  for (let key in CONSTANTS.road) {
    if (CONSTANTS.road[key].includes(locationID)) {
      const tableKey = `${roadVar === 1 ? "ped" : "bike"}`.concat(`road${key}`);
      return CONSTANTS.tableLookup[tableKey];
    }
  }
}

export function getLocationFilter(locationID) {
  return locationID < 0 ? `Rid=${locationID * -1}` : `fips=${locationID}`;
}
export function getLocationName(locationID) {
  return locationOptions.locations.filter(obj=>obj.value===locationID)[0].text;
}
export function getRoadVariable(roadVar) {
  return roadVar === 1 ? "Pedestrian Exposure" :"Bicycle Exposure";
}
export function getPazVariable(pazVar) {
  return filterOptions.PAZOptions.filter(opt => opt.value === pazVar)[0].text;
}
export function getDownloadLayer(selectedLayer) {
  return filterOptions.downloadOptions.filter(opt => opt.value === selectedLayer)[0].key;
}

export function getRankingFilter(pazVar, pazRank) {
  switch (pazVar) {
    case 2:
      return `PRrank >0 AND PRrank <= ${pazRank}`;
    case 3:
      return `BRrank >0 AND BRrank <= ${pazRank}`;
    case 4:
      return `PErank >0 AND PErank <= ${pazRank}`;
    case 5:
      return `BErank >0 AND BErank <= ${pazRank}`;
    case 6:
      return `PIErank >0 AND PIErank <= ${pazRank}`;
    case 7:
      return `BIErank >0 AND BIErank <= ${pazRank}`;
    case 8:
      return `NMRrank >0 AND NMRrank <= ${pazRank}`;
    case 9:
      return `NMErank >0 AND NMErank <= ${pazRank}`;
    default:
      return;
  }
}

export function getPointFilter(pointVars) {
  return `type IN (${[...pointVars]
    .filter(elem => elem)
    .map(elem => `'${elem}'`)
    .join(",")})`;
}

export function getZoomLevel(locationID) {
  return locationID < 0 ? 10 : 11;
}

export function getCenter(locationID) {
  const feature =
    locationID < 0
      ? mdotRegions.features.filter(
          feature => feature.properties.RID === locationID * -1
        )[0]
      : counties.features.filter(
          feature => feature.properties.FIPSNUM === locationID
        )[0];
  const [lng, lat] = d3Geo.geoCentroid(feature);
  return { lat, lng };
}

export function getLegendData(bins, colors) {
  return colors.map((color, i) => ({
    color,
    text: `${bins[i]} to ${bins[i + 1]}`
  }));
}

