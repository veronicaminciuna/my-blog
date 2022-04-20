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
import {format} from 'date-fns';
import api from './api/posts'


function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  let navigate = useNavigate();


  useEffect(()=> {
    const fetchPosts = async() => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (error) {
        if(error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log(`Error: ${error.message}`)
        }
      }
    }
    fetchPosts()
  },[])



  useEffect(()=> {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));
      setSearchResults(filteredResults.reverse());
  }, [posts,search])


  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length-1].id + 1 : 1;
    const datetime = format(new Date(), 'MMM dd, yyyy pp');
    const newPost = {id, title: postTitle, datetime, body: postBody}
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }



  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList)
    navigate('/');
  }

  return (
    <div className='App'>
      <Header title='My Blog'/>
      <Nav search={search} setSearch={setSearch}/>
      <Routes>
        <Route exact path="/" element={<Home posts={searchResults} />} />
        <Route exact path="/post" element={<NewPost 
        handleSubmit={handleSubmit} 
        postTitle={postTitle} 
        setPostTitle={setPostTitle}
        postBody={postBody}
        setPostBody={setPostBody}
        />} />
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
