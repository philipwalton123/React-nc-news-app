import './App.css';
import { Routes, Route} from 'react-router-dom';
import Welcome from './components/Welcome';
import Home from './components/Home';
import SingleArticle from './components/SingleArticle';
import { useState } from 'react';
import { LoggedInUserContext } from './contexts/LoggedInUser';
import Comment from './components/Comment';
import ErrorPage from './components/ErrorPage';
import Authors from './components/Authors';
import PostArticle from './components/PostArticle';
import { LocationContext } from './contexts/Location';
import NewTopic from './components/NewTopic';

function App() {

  const [loggedInUser, setLoggedInUser] = useState({username: 'guest', avatar_url: "https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png"})
  const [location, setLocation] = useState('home')

  return (
    <div className="App">
    <LoggedInUserContext.Provider value ={{loggedInUser, setLoggedInUser}}>
      <LocationContext.Provider value = {{location, setLocation}}>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/*" element={<Welcome />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/articles/*" element={<SingleArticle />} />
          <Route exact path="/comment/*" element={<Comment />} />
          <Route path="/home/*" element={<ErrorPage />} />
          <Route exact path="/authors" element={<Authors />} />
          <Route exact path="/post" element={<PostArticle />} />
          <Route exact path="/newtopic" element={<NewTopic />} />
        </Routes>
      </LocationContext.Provider>
     </LoggedInUserContext.Provider>
    </div>
  );
}

export default App;
