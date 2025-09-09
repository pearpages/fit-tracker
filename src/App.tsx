import { Example } from '@/components/Example';
import './App.scss';

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
        <Example />
      </main>
    </div>
  );
}

export default App;
