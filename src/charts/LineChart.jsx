import { ResponsiveLine } from "@nivo/line";
import { numberFormat } from "../utils/numberFormat";

const LineChart = ({ data = [], onFilter }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{ type: "linear", stacked: false }}
    axisBottom={{ legend: "Fecha", legendOffset: 40, legendPosition: "middle" }}
    axisLeft={{ legend: "Precio (COP)", legendOffset: -50, legendPosition: "middle", format: (v)=>numberFormat(v) }}
    colors={{ scheme: "category10" }}
    tooltip={(point)=> (
      <div style={{padding:4,background:'#fff'}}>
        <strong>{point.serieId}</strong><br/>
        {point.point.data.xFormatted}: {numberFormat(point.point.data.y)}
      </div>
    )}
    enablePoints={false}
    legends={[{
      anchor: "top-left",
      direction: "row",
      translateY: -10,
      itemWidth: 100,
      itemHeight: 12,
      symbolSize: 12
    }]}
    useMesh
    onClick={(p) => onFilter?.(p)}
    animate
    motionConfig="gentle"
  />
);

export default LineChart; 