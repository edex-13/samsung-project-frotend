import { ResponsivePie } from "@nivo/pie";

const PieChart = ({ data = [], onFilter }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    colors={{ scheme: "paired" }}
    legends={[{
      anchor: "right",
      direction: "column",
      itemWidth: 100,
      itemHeight: 14,
      symbolSize: 12,
      translateX: 20
    }]}
    onClick={(slice) => onFilter?.(slice)}
    animate
    motionConfig="gentle"
  />
);

export default PieChart; 