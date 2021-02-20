export type NewStoriesResponse = number[];

// TODO: tie this to Story interface
enum ItemType {
  Job = "job",
  Story = "story",
  Comment = "comment",
  Poll = "poll",
  PollOpt = "pollopt",
}

export interface Story {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
}

const HACKER_NEWS_API_BASE = "https://hacker-news.firebaseio.com";
export const NEW_STORIES_URL = HACKER_NEWS_API_BASE + "/v0/newstories.json";

/**
 * Fetch list of newest story ids
 */
export const getNewStoryIds = (): Promise<Story[]> => {
    // TODO: cors here seems necessary
  return fetch(NEW_STORIES_URL, {mode: 'cors'})
    .then((response) => {
      return (response.json() as unknown) as Promise<Story[]>; // TODO fix type
    })
    .catch((e) => {
      throw new Error("Unable to fetch stories");
    });
};
