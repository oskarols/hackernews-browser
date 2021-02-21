import { getNewStoryIds } from '../services/hackernews-service'

/**
 * Creates generator for paginating through set of numbers.
 *
 * @param storyIds
 * @param pageSize
 */
export async function* createPageGenerator(pageSize: number): AsyncGenerator<number[]> {
    let remainingStoryIds = await getNewStoryIds()

    while (remainingStoryIds.length !== 0) {
        const pageIds = remainingStoryIds.slice(0, pageSize)
        remainingStoryIds = remainingStoryIds.slice(pageSize)
        yield pageIds
    }
}
