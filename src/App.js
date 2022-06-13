import './App.css';
import { Routes, Route} from 'react-router-dom';
import Welcome from './components/Welcome';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
     </Routes>
    </div>
  );
}

export default App;
