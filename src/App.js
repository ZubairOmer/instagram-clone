import React, {useState, useEffect} from 'react'
import './App.css'

import Post from './Post'
import {db} from './firebase'

const App = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({ id : doc.id , post: doc.data() })))
        })
    })

    return (
        <div className='app'>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle}>
                    <h2>I am a modal</h2>
                </div>
            </Modal>
            
            <div className="app__header">
                {<img 
                className="app__headerImage"
                height="40px;"
                src="https://toogreen.ca/instagreen/img/instagreen.svg"
                alt="insta logo"
              /> }
            </div>

            {
                posts.map(({ id, post }) => (
                    <Post
                        key={id}
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
