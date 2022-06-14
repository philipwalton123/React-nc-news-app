import './App.css';
import { Routes, Route} from 'react-router-dom';
import Welcome from './components/Welcome';
import Home from './components/Home';
import SingleArticle from './components/SingleArticle';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/articles/*" element={<SingleArticle />} />
     </Routes>
    </div>
  );
}

export default App;
