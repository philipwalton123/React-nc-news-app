import './App.css';
import { Routes, Route} from 'react-router-dom';
import Welcome from './components/Welcome';
import Home from './components/Home';
import SingleArticle from './components/SingleArticle';
import { useState } from 'react';
import { LoggedInUserContext } from './contexts/LoggedInUser';
import Comment from './components/Comment';

function App() {

  const [loggedInUser, setLoggedInUser] = useState({username: 'guest', avatar_url: "https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png"})

  return (
    <div className="App">
    <LoggedInUserContext.Provider value ={{loggedInUser, setLoggedInUser}}>
     <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/articles/*" element={<SingleArticle />} />
      <Route path="/comment/*" element={<Comment />} />
     </Routes>
     </LoggedInUserContext.Provider>
    </div>
  );
}

export default App;
