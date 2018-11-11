import React from "react";
import { List, Label, Image } from "semantic-ui-react";
import { getLegendData } from "./helpers";

const PRbins = [0.1, 0.2, 1, 5, 12, 50];
const PRcolours = ["#f2f0f7", "#cbc9e2", "#9e9ac8", "#756bb1", "#54278f"];

const PEbins = [1, 4, 20, 80, 200, 2400];
const PEcolours = ["#edf8fb", "#b2e2e2", "#66c2a4", "#2ca25f", "#006d2c"];

const BRbins = [0.1, 0.2, 1, 4, 9, 50];
const BRcolours = ["#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"];

const BEbins = [1, 4, 15, 45, 85, 1100];
const BEcolours = ["#ffffcc", "#a1dab4", "#41b6c4", "#2c7fb8", "#253494"];

const pedbins = [0, 14, 52, 87, 490, 1100];
const pedcols = ["#feebe2", "#fbb4b9", "#f768a1", "#c51b8a", "#7a0177"];

const bikebins = [0, 7, 36, 66, 400, 900];
const bikecols = ["#f1eef6", "#d7b5d8", "#df65b0", "#dd1c77", "#980043"];

const PIEbins = [0, 8, 22, 31, 43, 75];
const PIEcolours = ["#f1eef6", "#bdc9e1", "#74a9cf", "#2b8cbe", "#045a8d"];

const BIEbins = [0, 11, 16, 35, 55, 99];
const BIEcolours = ["#ffffb2", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"];

const NMRbins = [0.1, 0.3, 2, 7, 16, 70];
const NMRcolours = ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"];

const NMEbins = [1, 5, 30, 115, 265, 3500];
const NMEcolours = ["#feedde", "#fdbe85", "#fd8d3c", "#e6550d", "#a63603"];

const imgsrc = [
  "./img/pedestrian.png",
  "./img/bike.png",
  "./img/schools.png",
  "./img/bars.png"
];
const Legend = props => {
  let legendData;
  if (props.type === "paz") {
    switch (props.var) {
      case 2:
        legendData = getLegendData(PRbins, PRcolours);
        break;
      case 3:
        legendData = getLegendData(BRbins, BRcolours);
        break;
      case 4:
        legendData = getLegendData(PEbins, PEcolours);
        break;
      case 5:
        legendData = getLegendData(BEbins, BEcolours);
        break;
      case 6:
        legendData = getLegendData(PIEbins, PIEcolours);
        break;
      case 7:
        legendData = getLegendData(BIEbins, BIEcolours);
        break;
      case 8:
        legendData = getLegendData(NMRbins, NMRcolours);
        break;
      case 9:
        legendData = getLegendData(NMEbins, NMEcolours);
        break;
      default:
        break;
    }
  } else if (props.type === "road") {
    switch (props.var) {
      case 2:
        legendData = getLegendData(bikebins, bikecols);
        break;
      default:
        legendData = getLegendData(pedbins, pedcols);
        break;
    }
  } else {
    legendData = imgsrc.map(src => ({
      src,
      text: /(\w+).png/g.exec(src)[0].replace(".png", "")
    }));
  }
  return (
    <List verticalAlign="middle">
      {legendData.map(obj => (
        <List.Item key={obj.text}>
          {props.type === "point" ? (
            <Image src={obj.src} style={{ width: "1.5em", height: "1.5em" }} />
          ) : (
            <Label
              size="tiny"
              style={{ marginRight: "5px", backgroundColor: obj.color }}
            />
          )}
          {obj.text}
        </List.Item>
      ))}
    </List>
  );
};

export default Legend;
