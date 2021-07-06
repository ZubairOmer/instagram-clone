import React, {useState, useEffect} from 'react'
import './App.css'

import Post from './Post'
import { db } from './firebase'
import Modal from '@material-ui/core/Modal'
import {makeStyles} from '@material-ui/core/styles'
import { Button, Input } from '@material-ui/core'

function getModalStyle(){
    const top = 50 
    const left = 50 

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    }
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width : 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding : theme.spacing(2,4,3)
                
    }
}))

const App = () => {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)

    const [posts, setPosts] = useState([])
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({ id : doc.id , post: doc.data() })))
        })
    })

    const signUp = event => {
        event.preventDefault()
        
    }

    return (
        <div className='app'>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form  className="app__signup">
                        <center>
                             <img 
                                className="app__headerImage"
                                height="40px;"
                                src="https://toogreen.ca/instagreen/img/instagreen.svg"
                                alt="insta logo"
                            />
                         </center>

                        <Input
                            placeholder='username'
                            type='text'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Input
                            placeholder='email'
                            type='text'
                            value={email}
                            onChange={e => setEmail( e.target.value)}
                        />
                        <Input
                            placeholder='password'
                            type='password'
                            value={password}
                            onChange={e => setPassword( e.target.value)}
                        />
                        <Button type='submit' onClick={signUp}>Sign Up</Button>
                   </form>
                </div>
            </Modal>

            <div className="app__header">
                <img 
                className="app__headerImage"
                height="40px;"
                src="https://toogreen.ca/instagreen/img/instagreen.svg"
                alt="insta logo"
              /> 
            </div>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>

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
