import React, { useEffect, useState } from 'react'
import { Story } from '../../services/hackernews-service'
import { RelativeTime } from '../RelativeTime/RelativeTime'
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
        props.storyData
            .then((story) => {
                setStoryData(story)
            })
            .catch(() => {
                // TODO
            })
    }, [props.storyData])

    if (story === undefined) {
        // we want to render a container with height here, otherwise
        // the infinite scroll component will trigger too many fetches
        // upon scrolling to bottom
        return <div className="story" role="article"></div>
    } else {
        return (
            <div className="story" role="article">
                <h2>
                    <a rel="noreferrer" href={story.url}>
                        {story.title}
                    </a>
                </h2>

                <p className="datetime">
                    <RelativeTime timestamp={story.time} />, by {story.by}
                </p>
            </div>
        )
    }
}
