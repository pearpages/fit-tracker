interface ContributionData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

type Week = [
  ContributionData,
  ContributionData,
  ContributionData,
  ContributionData,
  ContributionData,
  ContributionData,
  ContributionData,
];

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export type { ContributionData, Week };
export { monthNames, dayNames };
