import React, { useState } from 'react'
import './App.css'
import { StoryList } from './components/StoryList/StoryList'

function App() {
    const [error, setError] = useState<Error>()

    return (
        <div className="App">
            <header className="App-header">Hackernews Stories</header>
            <main>
                <StoryList onError={setError} />
            </main>
        </div>
    )
}

export default App
