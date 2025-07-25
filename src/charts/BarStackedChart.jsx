import { ResponsiveBar } from "@nivo/bar";
import { numberFormat } from "../utils/numberFormat";

const BarStackedChart = ({ data = [], onFilter }) => {
  if (!data.length) return null;
  const keys = Object.keys(data[0]).filter((k) => k !== "comercio");
  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy="comercio"
      margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
      axisLeft={{ format:v=>v.toLocaleString('es-CO') }}
      tooltip={({ id, value, indexValue }) => (
        <div style={{padding:4,background:'#fff'}}>
          {indexValue} - {id}: {value.toLocaleString('es-CO')}
        </div>
      )}
      padding={0.3}
      labelSkipWidth={16}
      labelSkipHeight={16}
      legends={[{
        dataFrom: "keys",
        anchor: "right",
        direction: "column",
        itemWidth: 100,
        itemHeight: 14,
        symbolSize: 12,
        translateX: 120
      }]}
      onClick={(bar) => onFilter?.(bar)}
      animate
      motionConfig="gentle"
    />
  );
};

export default BarStackedChart; 