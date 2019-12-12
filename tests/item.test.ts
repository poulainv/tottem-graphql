import { reAssignPosition } from '../src/types'

describe('Reassign position method when full move', () => {
    test('No missing element', () => {
        const data = [
            {
                id: 'a',
                position: 0,
            },
            {
                id: 'b',
                position: 1,
            },
            {
                id: 'c',
                position: 2,
            },

            {
                id: 'd',
                position: 3,
            },
        ]
        const actual = reAssignPosition(data, 3, 0)

        const expected = [
            {
                id: 'd',
                position: 0,
            },
            {
                id: 'a',
                position: 1,
            },

            {
                id: 'b',
                position: 2,
            },

            {
                id: 'c',
                position: 3,
            },
        ]

        expect(actual).toEqual(expected)
    })

    test('Missing element', () => {
        const data = [
            {
                id: 'a',
                position: 0,
            },
            {
                id: 'b',
                position: 3,
            },
            {
                id: 'c',
                position: 5,
            },
        ]
        const actual = reAssignPosition(data, 0, 2)

        const expected = [
            {
                id: 'b',
                position: 0,
            },
            {
                id: 'c',
                position: 1,
            },
            {
                id: 'a',
                position: 2,
            },
        ]

        expect(actual).toEqual(expected)
    })
})

describe('Reassign position method when partial move', () => {
    test('No missing element', () => {
        const data = [
            {
                id: 'a',
                position: 0,
            },
            {
                id: 'b',
                position: 1,
            },
            {
                id: 'c',
                position: 2,
            },
        ]
        const actual = reAssignPosition(data, 0, 1)

        const expected = [
            {
                id: 'b',
                position: 0,
            },
            {
                id: 'a',
                position: 1,
            },
        ]
        expect(actual).toEqual(expected)
    })

    test('Missing elements', () => {
        const data = [
            {
                id: 'a',
                position: 0,
            },
            {
                id: 'b',
                position: 3,
            },
            {
                id: 'c',
                position: 4,
            },
        ]
        const actual = reAssignPosition(data, 0, 1)

        const expected = [
            {
                id: 'b',
                position: 0,
            },
            {
                id: 'a',
                position: 1,
            },
            {
                id: 'c',
                position: 2,
            },
        ]
        expect(actual).toEqual(expected)
    })
})
