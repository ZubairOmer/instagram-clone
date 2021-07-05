import React, {useState, useEffect} from 'react'
import './App.css'

import Post from './Post'
import {db} from './firebase'

const App = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => doc.data()))
        })
    })

    return (
        <div className='app'>
            <div className="app__header">
                {<img 
                className="app__headerImage"
                height="40px;"
                src="https://toogreen.ca/instagreen/img/instagreen.svg"
                alt="insta logo"
              /> }
            </div>

            {
                posts.map(post => (
                    <Post
                        username={post.username}
                        caption={post.caption}
                        imageUrl={post.imageUrl}
                    />
                ))
            }
        </div>
    )
}

export default App
