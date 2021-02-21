import React, { useEffect, useState } from 'react'
import { Story } from '../../services/hackernews-service'
import './StoryItem.css'

interface StoryItemProps {
    /**
     * Can be a story ID, in which case the fetching of story
     * is still in progress. Otherwise will have complete
     * story data.
     */
    storyData: Promise<Story>
}

export const StoryItem = (props: StoryItemProps) => {
    const [story, setStoryData] = useState<Story>()

    useEffect(() => {
        props.storyData.then((story) => {
            setStoryData(story)
        })
    }, [props.storyData])

    if (story === undefined) {
        return null
    } else {
        return (
            <div className="story">
                <h2>
                    <a rel="noreferrer" href={story.url}>
                        {story.title}
                    </a>
                </h2>
                <p>Posted: {story.time}</p>
                <p>By: {story.by}</p>
            </div>
        )
    }
}
