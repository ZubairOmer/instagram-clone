import React, {useState} from 'react'
import './App.css'

import Post from './Post'

const App = () => {
    const [posts, setPosts] = useState([
        {
            username : 'Zubair Omer',
            caption : 'i am gonna shok all once i start',
            imageUrl : ''
        },
        {
            username : 'Emra Omer',
            caption : 'I wil Love my father as he love me',
            imageUrl : ''
        },
        {
            username : 'Jahan Omer',
            caption : 'I wil Love my father as he love me',
            imageUrl : ''
        },
    ])

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
