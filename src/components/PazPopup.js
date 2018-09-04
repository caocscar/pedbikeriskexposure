import React from "react";
import { Popup, Icon } from "semantic-ui-react";

const PazPopup = props => {
  let content, reportUrl;
  switch (props.pazVar) {
    case 2:
    case 3:
    case 4:
    case 5:
      reportUrl =
        "https://github.com/caocscar/pedbikeriskexposure/blob/master/draft.md#risk-score";
      content =
        "Includes crash, roadway, exposure, built environment, and household characteristics. Click the info circle to see more detailed definition.";
      break;
    case 6:
    case 7:
      reportUrl =
        "https://github.com/caocscar/pedbikeriskexposure/blob/master/draft.md#pedestrian-index-of-the-environment-pie";
      content =
        "Built environment factors. See report for more info. Click the info circle to see more detailed definition.";
      break;
    default:
      break;
  }
  return (
    !(props.pazVar === 8 || props.pazVar === 9) && (
      <a href={reportUrl} target="_blank" rel="noopener noreferrer">
        <Popup
          size="tiny"
          trigger={<Icon name="info circle" color="blue" />}
          content={content}
          position="top center"
          inverted
        />
      </a>
    )
  );
};

export default PazPopup;
