import { createPageGenerator } from '../createPageGenerator'

describe('createPageGenerator', () => {
    it('can be used to paginate over numbers', () => {
        const paginator = createPageGenerator([1, 2, 3, 4, 5], 2)
        expect(paginator.next()).toStrictEqual(expect.objectContaining({ value: [1, 2] }))
        expect(paginator.next()).toStrictEqual(expect.objectContaining({ value: [3, 4] }))
        expect(paginator.next()).toStrictEqual(expect.objectContaining({ value: [5] }))
        expect(paginator.next()).toStrictEqual(
            expect.objectContaining({ done: true, value: undefined }),
        )
    })

    it('does not mutate the input', () => {
        const input = [1, 2, 3, 4, 5]
        const paginator = createPageGenerator(input, 2)
        let iterationResult
        while (iterationResult?.done === false) {
            iterationResult = paginator.next()
        }
        expect(input).toStrictEqual([1, 2, 3, 4, 5])
    })
})
