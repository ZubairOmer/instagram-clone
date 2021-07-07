import React, {useState, useEffect} from 'react'
import './Post.css'

import { Avatar } from '@material-ui/core'
import {db} from './firebase'

const Post = ({ username, caption, imageUrl, postId }) => {
    const [comments, setComments] = useState('')
    const [comment, setComment] = useState('')

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection('posts').docs(postId).collection('commetns').OnSnapshot(snapshot => {
                setComments(snapshot.docs.map(doc => doc.data()))
            })
        }

        return () => {
            unsubscribe()
        }
    }, [postId])

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

            <form>
                <input type="text" className='post__input'
                    placeholder='add a comment' value={comment} onChange={e => setComment(e.target.value)} />
                
            </form>
        </div>
    )
}

export default Post
