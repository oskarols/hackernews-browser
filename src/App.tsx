import React from 'react'
import './App.css'
import { StoryList } from './components/StoryList/StoryList'

function App() {
    return (
        <div className="App">
            <header className="App-header">Hackernews Stories</header>
            <main>
                <StoryList />
            </main>
        </div>
    )
}

export default App
