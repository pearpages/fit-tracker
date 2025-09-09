import { useState } from 'react';
import ContributionHeatmap from '../ContributionHeatmap';
import { ControlGroups } from './ControlGroups';
import { generateSampleData } from './generateSampleData';
import './index.scss';

const sampleData = generateSampleData();

function Example() {
  const [theme, setTheme] = useState('');
  const [useCustomData, setUseCustomData] = useState(false);

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
