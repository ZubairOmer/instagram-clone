import React, { useState } from 'react'

import Button from '@material-ui/core/Button'

const ImageUpload = () => {
    const [caption, setCaption] = useState('')

    return (
        <div>
            <input type="text" placeholder='Enter a caption' onChange={event => setCaption(event.target.value)} />
            <input type="file"  />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
