import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { pageGenerator } from '../../../lib/pageGenerator'
import { StoryItem } from '../../StoryItem/StoryItem'
import { render, waitFor, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { StoryList } from '../StoryList'

jest.mock('../../StoryItem/StoryItem')
jest.mock('react-infinite-scroll-component', () => ({
    __esModule: true,
    default: jest.fn(),
}))
jest.mock('../../../lib/pageGenerator', () => ({
    pageGenerator: jest.fn(),
}))

const mockedStoryItem = StoryItem as jest.Mock
const mockedInfiniteScroll = InfiniteScroll as jest.Mock
const mockedPageGenerator = pageGenerator as jest.Mock

describe('StoryList', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockedInfiniteScroll.mockImplementation((props) => {
            return <div>{props.children}</div>
        })
        mockedStoryItem.mockImplementation((props) => {
            return <article>test-story</article>
        })
    })

    it('requests an initial set of stories and renders items for them', async () => {
        mockedPageGenerator.mockImplementation(async function* test() {
            yield [1, 2, 3]
            yield [4, 5, 6]
        })
        render(<StoryList onError={() => {}} />)
        const articles = await screen.findAllByRole('article')
        expect(articles).toHaveLength(3)
        expect(mockedPageGenerator).toHaveBeenCalledTimes(1)
    })

    it('requests even more stories via the InfiniteScroll component', async () => {
        mockedPageGenerator.mockImplementation(async function* test() {
            yield [1, 2, 3]
            yield [4, 5, 6]
        })
        let fetchMoreStories: any
        mockedInfiniteScroll.mockImplementation((props) => {
            fetchMoreStories = props.next
            return <div>{props.children}</div>
        })
        render(<StoryList onError={() => {}} />)
        await screen.findAllByRole('article')
        fetchMoreStories()
        await waitFor(async () => {
            const articles = await screen.findAllByRole('article')
            expect(articles).toHaveLength(6)
        })
        expect(mockedPageGenerator).toHaveBeenCalledTimes(1)
    })

    it('propagates error from fetch stories to onError handler', async () => {
        const error = new Error('mock error')
        // eslint-disable-next-line require-yield
        mockedPageGenerator.mockImplementation(async function* test() {
            throw error
        })
        mockedInfiniteScroll.mockImplementation((props) => {
            return <div>{props.children}</div>
        })
        const onErrorHandler = jest.fn()
        render(<StoryList onError={onErrorHandler} />)
        await waitFor(async () => {
            expect(onErrorHandler).toHaveBeenCalledTimes(1)
            expect(onErrorHandler).toHaveBeenCalledWith(error)
        })
    })
})
