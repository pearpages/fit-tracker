import React from 'react';
import './ContributionHeatmap.scss';
import type { ContributionData } from './models';
import { monthNames, dayNames } from './models';
import { groupByWeeks } from './groupByWeeks';
import { generateMockData } from './generateMockData';

interface ContributionHeatmapProps {
  data?: ContributionData[];
  startDate?: Date;
  endDate?: Date;
  className?: string;
}

const ContributionHeatmap: React.FC<ContributionHeatmapProps> = ({
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
}) => {
  const contributionData =
    data.length > 0
      ? data
      : generateMockData({
          period: { start: startDate, end: endDate },
          isRealistic: false,
        });

  const weeks = groupByWeeks(contributionData);

  // Calculate months for header
  const getMonthsForHeader = () => {
    const months: { name: string; span: number }[] = [];
    let currentMonth = -1;
    let currentSpan = 0;

    weeks.forEach((week) => {
      if (week.length > 0) {
        // Find the first day in the week that falls within our actual data range
        let monthToUse = -1;
        const actualStartDate = new Date(startDate);
        const actualEndDate = new Date(endDate);

        for (const day of week) {
          const dayDate = new Date(day.date);
          if (dayDate >= actualStartDate && dayDate <= actualEndDate) {
            monthToUse = dayDate.getMonth();
            break;
          }
        }

        // If no day in the week is in our actual range, use the middle day (Wednesday)
        if (monthToUse === -1) {
          const middleDay = week[3]; // Wednesday (index 3)
          monthToUse = new Date(middleDay.date).getMonth();
        }

        if (monthToUse !== currentMonth) {
          if (currentMonth !== -1) {
            months.push({ name: monthNames[currentMonth], span: currentSpan });
          }
          currentMonth = monthToUse;
          currentSpan = 1;
        } else {
          currentSpan++;
        }
      }
    });

    if (currentMonth !== -1) {
      months.push({ name: monthNames[currentMonth], span: currentSpan });
    }

    return months;
  };

  const months = getMonthsForHeader();

  const formatTooltip = (contribution: ContributionData) => {
    const date = new Date(contribution.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    // Check if this is outside the actual data range
    const actualStartDate = new Date(startDate);
    const actualEndDate = new Date(endDate);
    const contributionDate = new Date(contribution.date);

    const isOutsideRange =
      contributionDate < actualStartDate || contributionDate > actualEndDate;

    if (isOutsideRange || contribution.count === 0) {
      return `${formattedDate}: No contributions`;
    }

    return `${formattedDate}: ${contribution.count} contribution${contribution.count !== 1 ? 's' : ''}`;
  };

  return (
    <div className={`contribution-heatmap ${className}`}>
      <div className="contribution-heatmap__header">
        <h3 className="contribution-heatmap__title">Activity Overview</h3>
        <p className="contribution-heatmap__subtitle">
          {
            contributionData
              .filter((d) => {
                const date = new Date(d.date);
                const actualStart = new Date(startDate);
                const actualEnd = new Date(endDate);
                return date >= actualStart && date <= actualEnd;
              })
              .filter((d) => d.count > 0).length
          }{' '}
          "healthy" days in the last year
        </p>
      </div>

      <div className="contribution-heatmap__container">
        {/* Month labels */}
        <div className="contribution-heatmap__months">
          {months.map((month, index) => {
            // Calculate width based on number of weeks and day size + gaps
            const weekWidth = `calc((var(--day-size) + var(--day-gap)) * ${month.span} - var(--day-gap))`;
            return (
              <div
                key={index}
                className="contribution-heatmap__month"
                style={{
                  width: weekWidth,
                  flexBasis: weekWidth,
                }}
              >
                {month.name}
              </div>
            );
          })}
        </div>

        {/* Day labels */}
        <div className="contribution-heatmap__days">
          {dayNames.map((day) => (
            <div key={day} className="contribution-heatmap__day-label">
              {window.innerWidth > 768 ? day : day.charAt(0)}
            </div>
          ))}
        </div>

        {/* Contribution grid */}
        <div className="contribution-heatmap__grid">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="contribution-heatmap__week">
              {week.map((contribution: ContributionData) => (
                <div
                  key={contribution.date}
                  className={`contribution-heatmap__day contribution-heatmap__day--level-${contribution.level}`}
                  title={formatTooltip(contribution)}
                  data-count={contribution.count}
                  data-date={contribution.date}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="contribution-heatmap__legend">
        <span className="contribution-heatmap__legend-text">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`contribution-heatmap__legend-item contribution-heatmap__legend-item--level-${level}`}
            title={`Level ${level}`}
          ></div>
        ))}
        <span className="contribution-heatmap__legend-text">More</span>
      </div>
    </div>
  );
};

export { ContributionHeatmap };
