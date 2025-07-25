import { ResponsiveBoxPlot } from "@nivo/boxplot";
import { numberFormat } from "../utils/numberFormat";

const BoxPlotChart = ({ data = [], onFilter }) => {
  if (!data.length) return null;
  return (
    <ResponsiveBoxPlot
      data={data}
      margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
      layout="vertical"
      enableGridX={false}
      enableGridY
      padding={0.32}
      axisBottom={{ legend: "Condición", legendOffset: 40, tickRotation: -45 }}
      axisLeft={{ legend: "Precio (M COP)", legendOffset: -50, format:v=>`${(v/1e6).toFixed(1)}M` }}
      tooltip={({description, value})=> null }
      colorBy="group"
      onClick={(d) => onFilter?.(d)}
      animate
      motionConfig="gentle"
    />
  );
};

export default BoxPlotChart; 