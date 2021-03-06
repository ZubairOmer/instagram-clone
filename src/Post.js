import React, {useState, useEffect} from 'react'
import './Post.css'

import { Avatar } from '@material-ui/core'
import firebase from 'firebase'
import {db} from './firebase'

const Post = ({ username, caption, imageUrl, postId, user }) => {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection('posts').doc(postId).collection('comments').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
                setComments(snapshot.docs.map(doc => doc.data()))
            })
        }

        return () => {
            unsubscribe()
        }
    }, [postId])

    const postComment = event => {
        event.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            text : comment,
            username: user.displayName,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('')
    }

    return (
        <div className='post'>
            <div className="post__header">
                <Avatar 
                    className='post__avatar'
                    alt={username}
                    src='/static/iamges/avatar/1.png'
                />
                <h3>{username}</h3>
            </div>

            <img
                className='post__image'
                src={imageUrl}
                alt="avatar"
            />

            <h4 className='post__text'><strong>{username}</strong>: {caption} </h4>

            <div className="post__comments">
                {comments.map(comment => (
                    <p>
                        <strong>{ comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>

            {user && 
                <form className='post__form'>
                <input type="text" className='post__input'
                    placeholder='add a comment' value={comment} onChange={e => setComment(e.target.value)} />
                
                <button type='submit' disabled={!comment} className='post__comment' onClick={postComment}>
                    Post
                </button>                
            </form>
            }
        </div>
    )
}

export default Post
