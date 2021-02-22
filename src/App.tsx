import React, { useState } from 'react'
import './App.css'
import { ErrorStatus } from './components/ErrorStatus/ErrorStatus'
import { StoryList } from './components/StoryList/StoryList'

function App() {
    const [error, setError] = useState<Error>()

    return (
        <div className="App">
            <header className="App-header">Hackernews Stories</header>
            <ErrorStatus error={error} />
            <main>
                <StoryList onError={setError} />
            </main>
        </div>
    )
}

export default App
