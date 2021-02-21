import React, { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { createPageGenerator } from '../../lib/createPageGenerator'
import { getPaginationSize } from '../../lib/getPaginationSize'
import { getStory, Story } from '../../services/hackernews-service'
import { StoryComponent } from '../Story/Story'

export const StoryList = () => {
    const [stories, setStories] = useState<Promise<Story>[]>([])
    const [getStoryPage, setStoryPageGenerator] = useState<ReturnType<typeof createPageGenerator>>()
    const [hasMore, setHasMore] = useState(true)
    const STORY_ITEM_HEIGHT = 30

    useEffect(() => {
        const pageSize = getPaginationSize(STORY_ITEM_HEIGHT)
        setStoryPageGenerator(createPageGenerator(pageSize))
    }, [])

    const memoizedAddMoreStories = useCallback(
        async function addMoreStories() {
            console.log('calling add more stories')
            if (!getStoryPage) {
                return
            }
            const newPage = await getStoryPage.next()
            if (newPage.done) {
                setHasMore(false)
                return
            }
            const newStories = newPage.value.map((storyId) => getStory(storyId))
            setStories((stories) => stories.concat(newStories))
        },
        [getStoryPage],
    )

    // initial fetch of stories
    useEffect(() => {
        memoizedAddMoreStories()
    }, [getStoryPage, memoizedAddMoreStories])

    return (
        <InfiniteScroll
            dataLength={stories.length}
            next={memoizedAddMoreStories}
            hasMore={hasMore}
            loader={<div>Loading</div>}
        >
            {stories.map((story, i) => (
                <StoryComponent key={i} storyData={story}></StoryComponent>
            ))}
        </InfiniteScroll>
    )
}
