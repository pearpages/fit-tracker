import type { ContributionData, Week } from "./models";

// Group data by weeks (Sunday to Saturday)
const groupByWeeks = (contributions: ContributionData[]) => {
  const weeks: Week[] = [];

  // Start from the first Sunday before or on the start date
  const firstDate = new Date(contributions[0].date);
  const startOfWeek = new Date(firstDate);
  startOfWeek.setDate(firstDate.getDate() - firstDate.getDay());

  // End at the last Saturday after or on the end date
  const lastDate = new Date(contributions[contributions.length - 1].date);
  const endOfWeek = new Date(lastDate);
  endOfWeek.setDate(lastDate.getDate() + (6 - lastDate.getDay()));

  // Create a map of contributions by date for quick lookup
  const contributionMap = new Map<string, ContributionData>();
  contributions.forEach((contribution) => {
    contributionMap.set(contribution.date, contribution);
  });

  // Generate weeks from start to end
  const currentDate = new Date(startOfWeek);
  while (currentDate <= endOfWeek) {
    const week: ContributionData[] = [];

    // Generate 7 days for each week
    for (let day = 0; day < 7; day++) {
      const dateString = currentDate.toISOString().split('T')[0];
      const contribution = contributionMap.get(dateString);

      if (contribution) {
        week.push(contribution);
      } else {
        // Create empty contribution for days without data
        week.push({
          date: dateString,
          count: 0,
          level: 0,
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    weeks.push(week as Week);
  }

  return weeks;
};

export { groupByWeeks };