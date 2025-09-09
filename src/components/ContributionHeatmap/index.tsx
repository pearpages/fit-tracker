import './index.scss';
import type { ContributionData } from './models';
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
  startDate?: Date;
  endDate?: Date;
  className?: string;
}

function ContributionHeatmap({
  data = [],
  startDate = new Date(
    new Date().setFullYear(
      new Date().getFullYear() - 1,
      new Date().getMonth(),
      new Date().getDate() + 1,
    ),
  ),
  endDate = new Date(),
  className = '',
}: ContributionHeatmapProps) {
  const contributionData =
    data.length > 0
      ? data
      : generateMockData({
          period: { start: startDate, end: endDate },
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
            startDate,
            endDate,
          })}
        />
        <DayLabels />

        <div className="contribution-heatmap__grid">
          {weeks.map((week, weekIndex) => (
            <Week
              week={week}
              key={weekIndex}
              period={{ start: startDate, end: endDate }}
            />
          ))}
        </div>
      </div>

      <Legend />
    </div>
  );
}

export { ContributionHeatmap };
