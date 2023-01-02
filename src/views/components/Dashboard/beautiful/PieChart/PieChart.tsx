import { ComputedDatum, ResponsivePie } from "@nivo/pie";
import { FC, PropsWithChildren } from "react";
import { AppThemes } from "../../../../../context/ThemeContext";
import { IPieChartData } from "../../../../../types/charts.types";
import st from "./PieChart.module.scss";

const pieFill = [
  {
    match: {
      id: "ruby",
    },
    id: "dots",
  },
  {
    match: {
      id: "c",
    },
    id: "dots",
  },
  {
    match: {
      id: "go",
    },
    id: "dots",
  },
  {
    match: {
      id: "python",
    },
    id: "dots",
  },
  {
    match: {
      id: "scala",
    },
    id: "lines",
  },
  {
    match: {
      id: "lisp",
    },
    id: "lines",
  },
  {
    match: {
      id: "elixir",
    },
    id: "lines",
  },
  {
    match: {
      id: "javascript",
    },
    id: "lines",
  },
];

interface IProps {
  data: IPieChartData[];
  color: string;
  theme: AppThemes;
  centerText?: React.ReactNode;
}

const PieChart: FC<IProps> = ({ data, color, theme, centerText }) => (
  <div className={st.wrapper}>
    <ResponsivePie
      tooltip={({ datum }: { datum: ComputedDatum<IPieChartData> }) => (
        <ChartTooltip>{datum.label}</ChartTooltip>
      )}
      data={data}
      margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
      startAngle={-180}
      innerRadius={0.8}
      activeOuterRadiusOffset={8}
      colors={[color, theme === AppThemes.dark ? "#393939" : "#d8d8d8"]}
      borderColor={`#fff`}
      enableArcLinkLabels={false}
      enableArcLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#fff"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabel="value"
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={`#fff`}
      fill={pieFill}
      motionConfig="default"
      legends={[]}
    />
    <div className={st.centerData}>{centerText}</div>
  </div>
);
export default PieChart;

export const ChartTooltip: FC<PropsWithChildren> = ({ children }) => {
  return <div className={st.tooltip}>{children}</div>;
};
