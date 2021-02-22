import React, { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { createPageGenerator } from '../../lib/createPageGenerator'
import { getPaginationSize } from '../../lib/getPaginationSize'
import { getStory, Story } from '../../services/hackernews-service'
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator'
import { StoryItem } from '../StoryItem/StoryItem'
import './StoryList.css'

interface StoryListProps {
    onError: (error: Error) => void
}

/**
 * Does an infinite scroll of hacker news stories.
 */
export const StoryList = (props: StoryListProps) => {
    const [stories, setStories] = useState<Promise<Story>[]>([])
    const [getStoryPage, setStoryPageGenerator] = useState<ReturnType<typeof createPageGenerator>>()
    const [hasMore, setHasMore] = useState(true)
    const STORY_ITEM_HEIGHT = 40

    // responsible for fetching additional stories
    const memoizedAddMoreStories = useCallback(
        async function addMoreStories() {
            if (!getStoryPage) {
                return
            }
            try {
                const newPage = await getStoryPage.next()
                if (newPage.done) {
                    setHasMore(false)
                    return
                }
                const newStories = newPage.value.map((storyId) => getStory(storyId))
                setStories((stories) => stories.concat(newStories))
            } catch (e) {
                props.onError(e)
            }
        },
        [getStoryPage, props],
    )

    // set pagination generator
    useEffect(() => {
        const pageSize = getPaginationSize(STORY_ITEM_HEIGHT)
        setStoryPageGenerator(createPageGenerator(pageSize))
    }, [])

    // initial fetch of stories
    useEffect(() => {
        if (getStoryPage && memoizedAddMoreStories) {
            memoizedAddMoreStories()
        }
    }, [getStoryPage, memoizedAddMoreStories])

    return (
        <div className="StoryList" role="feed">
            <InfiniteScroll
                dataLength={stories.length}
                next={memoizedAddMoreStories}
                hasMore={hasMore}
                loader={LoadingIndicator()}
            >
                {stories.map((story, i) => (
                    <StoryItem key={i} storyData={story} />
                ))}
            </InfiniteScroll>
        </div>
    )
}
