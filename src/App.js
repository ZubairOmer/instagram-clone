import React, {useState, useEffect} from 'react'
import './App.css'

import Post from './Post'
import { db } from './firebase'
import Modal from '@material-ui/core/Modal'
import {makeStyles} from '@material-ui/core/styles'
import { Button, Input } from '@material-ui/core'
import { auth } from './firebase'
import ImageUpload from './ImageUpload'
import InstagramEmbed from 'react-instagram-embed'

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
    const [user, setUser] = useState(null)
    const [openSignIn, setOpenSignIn] = useState(false)

    // any thime we use state var inside useEffect we should also use it as dependecy 
    useEffect(() => {
        const unsbscribe = auth.onAuthStateChanged(authUser => {
            if (authUser) {
                // if logged               
                setUser(authUser)
            }
            else{
                //if logged out
                setUser(null)
            }
        })

        return () => { // component will unmont
            unsbscribe()
        }
    }, [user, username])

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({ id : doc.id , post: doc.data() })))
        })
    })

    const signUp = event => {
        event.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                return authUser.user.updateProfile({
                    displayName : username
                })
            })
            .catch(error => alert(error.message))
        setOpen(false)
    }

    const signIn = event => {
        event.preventDefault()

        auth.signInWithEmailAndPassword(email, password)
            .catch(error => alert(error.message))
        
        setOpenSignIn(false)
    }

    return (
        <div className='app'>           
            <Modal open={open} onClose={() => setOpen(false)} >
                <div style={modalStyle} className={classes.paper}>
                    <form  className="app__signup">
                        <center>
                             <img  className="app__headerImage" height="40px;" src="https://toogreen.ca/instagreen/img/instagreen.svg" alt="insta logo"/>
                         </center>
                        <Input placeholder='username' type='text' value={username} onChange={e => setUsername(e.target.value)}/>
                        <Input placeholder='email' type='text' value={email} onChange={e => setEmail( e.target.value)} />
                        <Input placeholder='password' type='password' value={password} onChange={e => setPassword( e.target.value)} />
                        <Button type='submit' onClick={signUp}>Sign Up</Button>
                   </form>
                </div>
            </Modal>

            <Modal open={openSignIn} onClose={() => setOpenSignIn(false)} >
                <div style={modalStyle} className={classes.paper}>
                    <form  className="app__signup">
                        <center>
                             <img  className="app__headerImage" height="40px;" src="https://toogreen.ca/instagreen/img/instagreen.svg" alt="insta logo"/>
                         </center>                    
                        <Input placeholder='email' type='text' value={email} onChange={e => setEmail( e.target.value)} />
                        <Input placeholder='password' type='password' value={password} onChange={e => setPassword( e.target.value)} />
                        <Button type='submit' onClick={signIn}>Sign In</Button>
                   </form>
                </div>
            </Modal>

            <div className="app__header">
                <img className="app__headerImage" height="40px;" src="https://toogreen.ca/instagreen/img/instagreen.svg" alt="insta logo" />
                {user ? (
                <Button onClick={() => auth.signOut()}>Logout</Button>
            ) : (
                    <div className="app__loginContainer">
                          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                          <Button onClick={() => setOpen(true)}>Sign Up</Button>
                    </div>
            )}

            </div>
            
            <div className='app__post'>
                <div className="app__postLeft">
                     {
                posts.map(({ id, post }) => (
                    <Post
                        key={id}
                        postId={id}
                        username={post.username}
                        user={user}
                        caption={post.caption}
                        imageUrl={post.imageUrl}
                    />
                ))
                }
                </div>
                <div className="app__postRight">
                     <InstagramEmbed
                        url="https://www.instagram.com/p/B_uf9dmAGPw/"
                        maxWidth={320}
                        hideCaption={false}
                        containerTagName="div"
                        protocol=''
                        injectScript
                        onLoading={() => { }}
                        onSuccess={() => { }}
                        onAfterRender={() => { }}
                        onFailure={() => { }}
            />
               </div>
            </div>
            

             {user?.displayName ? (
                <ImageUpload username = {user.displayName} />
            ) : (
                    <h3>Loggin To Upload</h3>
            )}

        </div>
    )
}

export default App
