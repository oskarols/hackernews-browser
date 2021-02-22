import { getNewStoryIds } from '../services/hackernews-service'

/**
 * Creates generator for paginating through set of numbers.
 *
 * @pageSize how many items that should be returned per page
 */
export async function* pageGenerator(pageSize: number): AsyncGenerator<number[]> {
    let remainingStoryIds = await getNewStoryIds()

    while (remainingStoryIds.length !== 0) {
        const pageIds = remainingStoryIds.slice(0, pageSize)
        remainingStoryIds = remainingStoryIds.slice(pageSize)
        yield pageIds
    }
}
