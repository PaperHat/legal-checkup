import { of } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'

import { checkupComplete, nextQuestionActivated } from '../../actions'
import {
  CHECKUP_COMPLETE,
  NEXT_QUESTION_ACTIVATED,
  USER_RESPONDED_WITH_NO,
  USER_RESPONDED_WITH_NOT_SURE,
  USER_RESPONDED_WITH_YES
} from '../../constants'
import { state } from '../../fixtures'
import { getActiveQuestionIndex, getQuestionCount } from '../../selectors'

import responseReceivedEpic from './'

jest.mock('../../actions', () => ({
  checkupComplete: jest
    .fn()
    .mockReturnValue({ type: '@checkup/CHECKUP_COMPLETE' }),
  nextQuestionActivated: jest.fn()
}))
jest.mock('../../selectors', () => ({
  getActiveQuestionIndex: jest.fn(),
  getQuestionCount: jest.fn()
}))

const makeTestScheduler = () =>
  new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected)
    jest.resetAllMocks()
  })

describe('state:epics', () => {
  describe('responseReceivedEpic', () => {
    it(`generates a ${NEXT_QUESTION_ACTIVATED} action when the active question is less than question count`, () => {
      makeTestScheduler().run(({ hot, cold, expectObservable }) => {
        const action$ = hot('abc', {
          a: { type: USER_RESPONDED_WITH_YES },
          b: { type: USER_RESPONDED_WITH_NO },
          c: { type: USER_RESPONDED_WITH_NOT_SURE }
        })
        const activeQuestionIndex = 0
        const questionCount = 28
        const state$ = of({ ...state, activeQuestionIndex })
        const expectedResponse = {
          type: NEXT_QUESTION_ACTIVATED,
          payload: {
            activeQuestionIndex: activeQuestionIndex + 1
          }
        }

        getActiveQuestionIndex.mockReturnValue(activeQuestionIndex)
        getQuestionCount.mockReturnValue(questionCount)
        nextQuestionActivated.mockReturnValue(expectedResponse)

        const output$ = responseReceivedEpic(action$, state$)

        expectObservable(output$).toBe('abc', {
          a: expectedResponse,
          b: expectedResponse,
          c: expectedResponse
        })
      })
    })

    it(`generates a ${CHECKUP_COMPLETE} action when the active question is equal to the question count`, () => {
      makeTestScheduler().run(({ hot, cold, expectObservable }) => {
        const action$ = hot('a', { a: { type: USER_RESPONDED_WITH_YES } })
        const activeQuestionIndex = 27
        const questionCount = 28
        const state$ = of({ ...state, activeQuestionIndex })
        const expectedResponse = {
          type: CHECKUP_COMPLETE
        }

        getActiveQuestionIndex.mockReturnValue(activeQuestionIndex)
        getQuestionCount.mockReturnValue(questionCount)
        checkupComplete.mockReturnValue(expectedResponse)

        const output$ = responseReceivedEpic(action$, state$)

        expectObservable(output$).toBe('a', {
          a: expectedResponse
        })
      })
    })

    it(`shouldn't generate an action when action type not ${USER_RESPONDED_WITH_YES}, ${USER_RESPONDED_WITH_NO} or ${USER_RESPONDED_WITH_NOT_SURE}`, () => {
      makeTestScheduler().run(({ hot, cold, expectObservable }) => {
        const action$ = hot('a', { a: { type: 'NOT_A_VALID_ACTION' } })
        const state$ = of(state)

        const output$ = responseReceivedEpic(action$, state$)

        expectObservable(output$).toBe('-')
      })
    })
  })
})
