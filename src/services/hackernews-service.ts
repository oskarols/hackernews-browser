import { Overwrite } from '../lib/ts-utilities'

export type NewStoriesResponse = number[]

export interface Story {
    by: string
    descendants: number
    id: number
    kids: number[]
    score: number
    time: number
    title: string
    type: 'story'
    url: string
}

// on "ask-hn" posts url is not set
type AskHNStory = Overwrite<Story, { url: undefined }>

type StoryResponse = Story | AskHNStory

function isAskHNStory(story: Story | AskHNStory): story is AskHNStory {
    return story.url === undefined
}

export const HACKER_NEWS_API_BASE = 'https://hacker-news.firebaseio.com'
export const NEW_STORIES_PATH = '/v0/newstories.json'
export const NEW_STORIES_URL = HACKER_NEWS_API_BASE + NEW_STORIES_PATH

export const STORY_PATH_TEMPLATE = '/v0/item/'
export const STORY_URL_TEMPLATE = HACKER_NEWS_API_BASE + STORY_PATH_TEMPLATE

export const ASK_HN_URL = 'https://news.ycombinator.com/item?id='

/**
 * Fetch list of newest story ids.
 */
export const getNewStoryIds = (): Promise<number[]> => {
    return fetch(NEW_STORIES_URL, { mode: 'cors' })
        .then((response) => {
            return (response.json() as unknown) as Promise<number[]> // TODO fix type
        })
        .catch((e) => {
            throw new Error('Unable to fetch stories')
        })
}

/**
 * Fetches more data for a HN story and normalizes data.
 * @param storyId
 */
export const getStory = (storyId: number): Promise<Story> => {
    // TODO: fix the url template here somehow
    return fetch(STORY_URL_TEMPLATE + storyId + '.json', { mode: 'cors' })
        .then((response) => (response.json() as unknown) as Promise<StoryResponse>)
        .then((story) =>
            isAskHNStory(story)
                ? ({
                      ...story,
                      url: ASK_HN_URL + story.id,
                  } as Story)
                : story,
        )
        .catch((e) => {
            throw new Error('Unable to fetch story for ID ' + storyId)
        })
}
