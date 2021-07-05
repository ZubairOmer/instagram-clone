import React from 'react'
import './App.css'

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
        </div>
    )
}

export default App
