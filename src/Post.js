import React from 'react'
import './Post.css'

import {Avatar} from '@material-ui/core'

const Post = ({ username, caption, imageUrl }) => {
    console.log(username);
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

            <h4
                className='post__text'><strong>{username}</strong> :{caption}
            </h4>
        </div>
    )
}

export default Post
