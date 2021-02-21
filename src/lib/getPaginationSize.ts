import { window } from './window'

/**
 * Calculates a reasonable number of items to load per page
 * using viewport size and approximate item height.
 *
 * @itemHeight
 */
export const getPaginationSize = (itemHeight: number): number => {
    const viewPortHeight = window.innerHeight
    return Math.ceil(viewPortHeight / itemHeight)
}
