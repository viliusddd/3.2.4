import { omit } from 'lodash/fp'
import { parse, parseInsertable, parseUpdateable } from '../schema'
import { fakeScreeningsFull } from './utils'

// Generally, schemas are tested with a few examples of valid and invalid records.

it('parses a valid record', () => {
  const record = fakeScreeningsFull()

  expect(parse(record)).toEqual(record)
})

it('throws an error due to empty/missing title (concrete)', () => {
  // ARRANGE
  const screeningsWithoutMovieId = {
    id: 52,
    movieId: NaN,
    ticketsId: 33,
    date: '2025-11-11T11:11:11Z',
  }
  const screeningsEmptyMovieId = {
    id: 52,
    movieId: NaN,
    ticketsId: 33,
    date: '2025-11-11T11:11:11Z',
  }

  // ACT & ASSERT
  // expect our function to throw an error that
  // mentions an issue with the title
  expect(() => parse(screeningsWithoutMovieId)).toThrow(/movieId/i)
  expect(() => parse(screeningsEmptyMovieId)).toThrow(/movieId/i)
})

// a more generic vesion of the above test, which makes
// no assumptions about other properties
it('throws an error due to empty/missing movieId (generic)', () => {
  const articleWithoutTitle = omit(['movieId'], fakeScreeningsFull())
  const articleEmptyTitle = fakeScreeningsFull({
    movieId: NaN,
  })

  expect(() => parse(articleWithoutTitle)).toThrow(/movieId/i)
  expect(() => parse(articleEmptyTitle)).toThrow(/movieId/i)
})

it('throws an error due to empty/missing movieId', () => {
  const recordWithoutMovieId = omit(['movieId'], fakeScreeningsFull())
  const recordEmpty = fakeScreeningsFull({
    movieId: NaN,
  })

  expect(() => parse(recordWithoutMovieId)).toThrow(/movieId/i)
  expect(() => parse(recordEmpty)).toThrow(/movieId/i)
})

// every other function is a derivative of parse()
describe('parseInsertable', () => {
  it('omits id', () => {
    const parsed = parseInsertable(fakeScreeningsFull())

    expect(parsed).not.toHaveProperty('id')
  })
})

describe('parseUpdateable', () => {
  it('omits id', () => {
    const parsed = parseUpdateable(fakeScreeningsFull())

    expect(parsed).not.toHaveProperty('id')
  })
})
