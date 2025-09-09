import { createDateString, type ContributionData } from '../models';

const isSummerMonth = (month: number) => {
  return month >= 5 && month <= 7;
};

const getLevel = (count: number): ContributionData['level'] => {
  let level: 0 | 1 | 2 | 3 | 4 = 0;
  if (count === 0) level = 0;
  else if (count <= 2) level = 1;
  else if (count <= 5) level = 2;
  else if (count <= 8) level = 3;
  else level = 4;

  return level;
};

function createMockContributionData(date: Date): ContributionData {
  // Create realistic patterns
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const month = date.getMonth();

  let baseCount = isWeekend ? 2 : 8;

  // Lower activity in summer months (June, July, August)
  if (isSummerMonth(month)) {
    baseCount = Math.max(0, baseCount - 3);
  }

  // Add some randomness
  const randomFactor = Math.random();
  let count = 0;

  if (randomFactor > 0.3) {
    count = Math.floor(Math.random() * baseCount);
  }

  // Occasional high activity days
  if (randomFactor > 0.95) {
    count += Math.floor(Math.random() * 10);
  }

  return {
    date: createDateString(date),
    count,
    level: getLevel(count),
  };
}

export const generateSampleData = (): ContributionData[] => {
  const data: ContributionData[] = [];
  const startDate = new Date(); // Today
  startDate.setFullYear(startDate.getFullYear() - 1); // One year ago

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push(createMockContributionData(date));
  }

  return data;
};
