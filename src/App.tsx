import { ContributionHeatmapExample } from '@/components/ContributionHeatmap/Example';
import './App.scss';
import { ModalExample } from './components/Modal/Example';
import { FormExample } from '@/components/Form/Example';

const Header = () => (
  <header className="app__header">
    <h1 className="app__title">
      <img height="64" src="/kawaii-pear.svg" alt="Kawaii Pear" /> Fit Tracker
    </h1>
  </header>
);

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <ModalExample />
        <FormExample />
        <ContributionHeatmapExample />
      </main>
    </div>
  );
}

export default App;
