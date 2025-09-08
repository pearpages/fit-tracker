import { Example } from '@/components/Example';
import './App.scss';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">
          <img height="64" src="/kawaii-pear.svg" alt="Kawaii Pear" /> Fit
          Tracker
        </h1>
        <p className="app__subtitle">
          Beautiful GitHub-style contribution heatmap
        </p>
      </header>

      <main className="app__main">
        <Example />
      </main>
    </div>
  );
}

export default App;
