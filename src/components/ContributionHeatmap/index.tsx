import './index.scss';
import type { ContributionData, Period } from './models';
import { getLastYearPeriod } from './models';
import { groupByWeeks } from './groupByWeeks';
import { getMonthsForHeader } from './getMonthsForHeader';
import { generateMockData } from './generateMockData';
import { MonthLabels } from './MonthLabels';
import { DayLabels } from './DayLabels';
import { Legend } from './Legend';
import { Header } from './Header';
import { Week } from './Week';

interface ContributionHeatmapProps {
  data?: ContributionData[];
  period?: Period;
  className?: string;
}

function ContributionHeatmap({
  data = [],
  period = getLastYearPeriod(),
  className = '',
}: ContributionHeatmapProps) {
  const contributionData =
    data.length > 0
      ? data
      : generateMockData({
          period,
          isRealistic: false,
        });

  const weeks = groupByWeeks(contributionData);

  return (
    <div className={`contribution-heatmap ${className}`}>
      <Header data={contributionData} />

      <div className="contribution-heatmap__container">
        <MonthLabels
          months={getMonthsForHeader({
            weeks,
            period,
          })}
        />
        <DayLabels />

        <div className="contribution-heatmap__grid">
          {weeks.map((week, weekIndex) => (
            <Week week={week} key={weekIndex} period={period} />
          ))}
        </div>
      </div>

      <Legend />
    </div>
  );
}

export { ContributionHeatmap };
