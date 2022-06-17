import './App.css';
import { Routes, Route} from 'react-router-dom';
import Welcome from './components/Welcome';
import Home from './components/Home';
import SingleArticle from './components/SingleArticle';
import { useState } from 'react';
import { LoggedInUserContext } from './contexts/LoggedInUser';
import Comment from './components/Comment';
import ErrorPage from './components/ErrorPage';

function App() {

  const [loggedInUser, setLoggedInUser] = useState({username: 'guest', avatar_url: "https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png"})

  return (
    <div className="App">
    <LoggedInUserContext.Provider value ={{loggedInUser, setLoggedInUser}}>
     <Routes>
      <Route exact path="/" element={<Welcome />} />
      <Route exact path="/*" element={<Welcome />} />
      <Route exact path="/home" element={<Home />} />
      <Route path="/articles/*" element={<SingleArticle />} />
      <Route exact path="/comment/*" element={<Comment />} />
      <Route path="/home/*" element={<ErrorPage />} />
      
     </Routes>
     </LoggedInUserContext.Provider>
    </div>
  );
}

export default App;
