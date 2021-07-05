import React from 'react'
import './App.css'

import Post from './Post'

const App = () => {
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

            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    )
}

export default App
