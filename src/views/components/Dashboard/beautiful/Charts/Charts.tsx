import React, { FC } from "react";
import { useTheme } from "../../../../../hooks/useTheme";
import { translate } from "../../../../../locales/translate";
import { IPieChartData } from "../../../../../types/charts.types";
import PieChart from "../PieChart/PieChart";
import st from "./Charts.module.scss";

interface IProps {
  completed: IPieChartData[];
  expired: IPieChartData[];
  inProgress: IPieChartData[];
  completedPercent: string;
  expiredPercent: string;
  inProgressPercent: string;
}

const Charts: FC<IProps> = ({
  completed,
  expired,
  inProgress,
  completedPercent,
  expiredPercent,
  inProgressPercent,
}) => {
  const { theme } = useTheme();

  return (
    <div className={st.charts}>
      <div className={st.chart}>
        <h4>{translate({ id: "project.chart.completed.title" })}</h4>
        <PieChart data={completed} color={"#00ff1a"} theme={theme} centerText={completedPercent} />
      </div>
      <div className={st.chart}>
        <h4>{translate({ id: "project.chart.expired.title" })}</h4>
        <PieChart data={expired} color={"#d32f2f"} theme={theme} centerText={expiredPercent} />
      </div>
      <div className={st.chart}>
        <h4>{translate({ id: "project.chart.progress.title" })}</h4>
        <PieChart data={inProgress} color={"#0288d1"} theme={theme} centerText={inProgressPercent} />
      </div>
    </div>
  );
};

export default Charts;
