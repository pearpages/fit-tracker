import { useState } from 'react';
import ContributionHeatmap from '../ContributionHeatmap';
import { ControlGroups } from './ControlGroups';
import { generateSampleData } from './generateSampleData';
import './index.scss';

function Example() {
  const [theme, setTheme] = useState('');
  const [useCustomData, setUseCustomData] = useState(false);
  const sampleData = generateSampleData();
  return (
    <>
      <div className="example__controls">
        <ControlGroups
          actions={{ theme, setTheme, useCustomData, setUseCustomData }}
        />
      </div>

      <div className="example__heatmap">
        <ContributionHeatmap
          className={theme ? `contribution-heatmap--${theme}` : ''}
          data={useCustomData ? sampleData : undefined}
        />
      </div>
    </>
  );
}

export { Example };
