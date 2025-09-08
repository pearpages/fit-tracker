import { useState } from 'react';
import ContributionHeatmap from './components/ContributionHeatmap';
import './App.scss';

// Sample contribution data for demonstration
const generateSampleData = () => {
  const data = [];
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    // Create realistic patterns
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const month = date.getMonth();

    let baseCount = isWeekend ? 2 : 8;

    // Lower activity in summer months (June, July, August)
    if (month >= 5 && month <= 7) {
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

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count === 0) level = 0;
    else if (count <= 2) level = 1;
    else if (count <= 5) level = 2;
    else if (count <= 8) level = 3;
    else level = 4;

    data.push({
      date: date.toISOString().split('T')[0],
      count,
      level,
    });
  }

  return data;
};

function App() {
  const [theme, setTheme] = useState('');
  const [useCustomData, setUseCustomData] = useState(false);
  const sampleData = generateSampleData();

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">🏃‍♂️ Fit Tracker</h1>
        <p className="app__subtitle">
          Beautiful GitHub-style contribution heatmap
        </p>
      </header>

      <main className="app__main">
        <div className="app__controls">
          <div className="control-group">
            <label className="control-group__label">Theme:</label>
            <div className="control-group__buttons">
              <button
                className={`theme-button ${theme === '' ? 'theme-button--active' : ''}`}
                onClick={() => setTheme('')}
              >
                GitHub
              </button>
              <button
                className={`theme-button ${theme === 'ocean' ? 'theme-button--active' : ''}`}
                onClick={() => setTheme('ocean')}
              >
                Ocean
              </button>
              <button
                className={`theme-button ${theme === 'sunset' ? 'theme-button--active' : ''}`}
                onClick={() => setTheme('sunset')}
              >
                Sunset
              </button>
              <button
                className={`theme-button ${theme === 'purple' ? 'theme-button--active' : ''}`}
                onClick={() => setTheme('purple')}
              >
                Purple
              </button>
            </div>
          </div>

          <div className="control-group">
            <label className="control-group__checkbox">
              <input
                type="checkbox"
                checked={useCustomData}
                onChange={(e) => setUseCustomData(e.target.checked)}
              />
              Use realistic sample data
            </label>
          </div>
        </div>

        <div className="app__heatmap">
          <ContributionHeatmap
            className={theme ? `contribution-heatmap--${theme}` : ''}
            data={useCustomData ? sampleData : undefined}
          />
        </div>

        <div className="app__info">
          <h2>Features</h2>
          <ul>
            <li>
              📱 <strong>Mobile-friendly</strong> - Responsive design that works
              on all devices
            </li>
            <li>
              🎨 <strong>Multiple themes</strong> - GitHub, Ocean, Sunset, and
              Purple color schemes
            </li>
            <li>
              🌙 <strong>Dark mode support</strong> - Automatically adapts to
              system preference
            </li>
            <li>
              ♿ <strong>Accessible</strong> - Proper focus states and keyboard
              navigation
            </li>
            <li>
              📊 <strong>Interactive</strong> - Hover effects and tooltips for
              detailed information
            </li>
            <li>
              🏗️ <strong>BEM methodology</strong> - Clean, maintainable CSS
              architecture
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
