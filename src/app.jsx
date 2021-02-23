import { Router } from './router/index';
import { Link } from './router/prefetch';

import { useEffect, useState } from 'preact/compat';
import { ESRCH } from 'constants';

const initialPostsState = {
  "category":null,
  "current":0,
  "first":0,
  "last":0,
  "next":0,
  "page_size":0,
  "previous":null,
  "results":[
    {
      "id":0,
      "title":"",
      "contents":"",
      "contents_image_url":"",
      "category":"",
      "is_open":false,
      "pub_date":"",
      "comment":null
    },
  ],"total":6
}

const initialPostState = {
  "id":0,
  "title":"",
  "contents":"",
  "contents_image_url":"",
  "category":"",
  "is_open":false,
  "pub_date":"",
  "comment":null
}

const Home = () => <h1>hello world</h1>;
const About = () => <h1>abou page</h1>

const Posts = () => {
  const [posts, setPosts] = useState(initialPostsState)

  useEffect(async () => {
    await getPosts()
    .then(res => res.json())
    .then(posts => {
      setPosts(posts)
    })
    .catch(err => { console.log(err) })
  }, [])

  return (
    <div>
      <h1>hello posts</h1>
      {
        <h1>{ posts.results.map(post => <p><Link href={`/post/${post.id}`}>{post.title}</Link></p>) }</h1>
      }
    </div>
  )
}

const Post = (props) => {
  const id = props.id;
  const [post, setPost] = useState(initialPostState);

  useEffect(async () => {
    await getPost(id)
    .then(res => res.json())
    .then(post => setPost(post))
  }, [])
  
  return (
    <div>
      <h1>id: { id }</h1>
      <p>{ post.title }</p>
    </div>
  )
}

const getPosts = async () => {
  return await fetch('https://api.takurinton.com/blog/v1/')
}

const getPost = async (id) => {
  return await fetch(`https://api.takurinton.com/blog/v1/post/${id}`)
}

export function App(props) {
  return (
    <>
    <Link href="/">Home</Link> <br />
    <Link href="/about">About</Link> <br />
    <Link href="/posts">Posts</Link> <br />

      <Router>
        <Home path="/" />
        <About path="/about" />
        <Posts path="/posts" />
        <Post path="/post/:id" />
      </Router>
    </>
  )
}