import React, { useState } from 'react'

import Button from '@material-ui/core/Button'

const ImageUpload = () => {
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)

    const handleChange = event => {
        if (event.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleUpload = () => {

    }

    return (
        <div>
            <input type="text" placeholder='Enter a caption' onChange={event => setCaption(event.target.value)} />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
