import { resolve } from 'path'
import { getNewStoryIds } from '../../services/hackernews-service'
import { pageGenerator } from '../createPageGenerator'

jest.mock('../../services/hackernews-service')
const mockGetNewStoryIds = (getNewStoryIds as unknown) as jest.Mock

describe('pageGenerator', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('can be used to paginate over numbers', () => {
        mockGetNewStoryIds.mockResolvedValue(Promise.resolve([1, 2, 3, 4, 5]))
        const paginator = pageGenerator(2)
        expect(paginator.next()).resolves.toStrictEqual(expect.objectContaining({ value: [1, 2] }))
        expect(paginator.next()).resolves.toStrictEqual(expect.objectContaining({ value: [3, 4] }))
        expect(paginator.next()).resolves.toStrictEqual(expect.objectContaining({ value: [5] }))
        expect(paginator.next()).resolves.toStrictEqual(
            expect.objectContaining({ done: true, value: undefined }),
        )
        // should only call 1 time when initializing
        expect(mockGetNewStoryIds).toHaveBeenCalledTimes(1)
    })

    it('does not mutate the input', async () => {
        const input = [1, 2, 3, 4, 5]
        mockGetNewStoryIds.mockResolvedValue(input)
        const paginator = pageGenerator(2)
        let iterationResult
        while (iterationResult?.done === false) {
            iterationResult = await paginator.next()
        }
        expect(input).toStrictEqual([1, 2, 3, 4, 5])
    })
})
