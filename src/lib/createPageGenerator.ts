/**
 * Creates generator for paginating through set of numbers.
 *
 * @param storyIds
 * @param pageSize
 */
export function* createPageGenerator(storyIds: number[], pageSize: number): Generator<number[]> {
    let remainingStoryIds = storyIds

    while (remainingStoryIds.length !== 0) {
        const pageIds = remainingStoryIds.slice(0, pageSize)
        remainingStoryIds = remainingStoryIds.slice(pageSize)
        yield pageIds
    }
}
