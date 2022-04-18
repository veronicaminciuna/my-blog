import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';


function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'First Post',
      datetime: 'July 1, 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor it amet consectetur adipisicing elit.'
    },
    {
      id: 2,
      title: 'Second Post',
      datetime: 'July 2, 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor it amet consectetur adipisicing elit.'
    },
    {
      id: 3,
      title: 'Third Post',
      datetime: 'July 3, 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor it amet consectetur adipisicing elit.'
    },
  ])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className='App'>
      <Header title='My Blog'/>
      <Nav search={search} setSearch={setSearch}/>
      <Routes>
        <Route exact path="/" element={<Home posts={posts} />} />
        <Route exact path="/post" element={<NewPost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
