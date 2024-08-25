import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import logo from './logo.svg';

function App() {
  return (
    <div className="app-container">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
