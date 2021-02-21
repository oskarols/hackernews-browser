import { getPaginationSize } from '../getPaginationSize'

jest.mock('../window', () => ({
    window: {
        innerHeight: 1000,
    },
}))

describe('getPaginationSize', () => {
    it('returns the rounded up correct number', () => {
        expect(getPaginationSize(90)).toBe(12)
    })
})
