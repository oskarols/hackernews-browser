export type NewStoriesResponse = number[]

// TODO: tie this to Story interface
enum ItemType {
    Job = 'job',
    Story = 'story',
    Comment = 'comment',
    Poll = 'poll',
    PollOpt = 'pollopt',
}

export interface Story {
    by: string
    descendants: number
    id: number
    kids: number[]
    score: number
    time: number
    title: string
    type: 'story'
}

export const HACKER_NEWS_API_BASE = 'https://hacker-news.firebaseio.com'
export const NEW_STORIES_PATH = '/v0/newstories.json'
export const NEW_STORIES_URL = HACKER_NEWS_API_BASE + NEW_STORIES_PATH

export const STORY_PATH_TEMPLATE = '/v0/item/'
export const STORY_URL_TEMPLATE = HACKER_NEWS_API_BASE + STORY_PATH_TEMPLATE

/**
 * Fetch list of newest story ids.
 */
export const getNewStoryIds = (): Promise<number[]> => {
    // TODO: cors here seems necessary
    return fetch(NEW_STORIES_URL, { mode: 'cors' })
        .then((response) => {
            return (response.json() as unknown) as Promise<number[]> // TODO fix type
        })
        .catch((e) => {
            throw new Error('Unable to fetch stories')
        })
}

export const getStory = (storyId: number): Promise<Story> => {
    return fetch(STORY_URL_TEMPLATE + storyId, { mode: 'cors' })
        .then((response) => {
            return (response.json() as unknown) as Promise<Story>
        })
        .catch((e) => {
            throw new Error('Unable to fetch story for ID ' + storyId)
        })
}
