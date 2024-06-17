import { expect } from 'vitest'
import type { Insertable } from 'kysely'
import type { Screenings } from '@/database'

// Function to generate fake data.
// If our articles schema changes and our tests break,
// we will not have to update all our tests, but only this function.
export const fakeScreenings = (
  overrides: Partial<Insertable<Screenings>> = {}
): Insertable<Screenings> => ({
  date: '2025-11-11T11:11:11Z',
  movieId: 123,
  ticketsId: 1,
  id: 2,
  ...overrides,
})

// Producing flexible matchers for our fake data.
// You are free to use simple hard-coded expectations for your tests.
// However, if you want to be have tests that pin-point the exact issue,
// you should consider matchers.
export const screeningsMatcher = (
  overrides: Partial<Insertable<Screenings>> = {}
) => ({
  id: expect.any(Number),
  ...overrides, // for id
  ...fakeScreenings(overrides),
})

export const fakeScreeningsFull = (
  overrides: Partial<Insertable<Screenings>> = {}
) => ({
  id: 2,
  ...fakeScreenings(overrides),
})
