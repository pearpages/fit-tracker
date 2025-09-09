import type { ContributionData } from './models';

function Header({ data }: { data: ContributionData[] }): React.ReactNode {
  return (
    <div className="contribution-heatmap__header">
      <h3 className="contribution-heatmap__title">Activity Overview</h3>
      <p className="contribution-heatmap__subtitle">
        {data.filter((d) => d.count > 0).length} "healthy" days in the last year
      </p>
    </div>
  );
}

export { Header };
