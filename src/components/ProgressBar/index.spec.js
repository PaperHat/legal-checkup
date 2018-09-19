import React from 'react'
import { shallow } from 'enzyme'

import ProgressBar from '.'
import StyledAnsweredQuestionNumber from '.'

describe('components:ProgressBar', function () {
  it('renders the ProgressBar and CSS properties properly', () =>
    expect(
      toJson(shallow(<ProgressBar>ProgressBar</ProgressBar>))
    ).toMatchSnapshot())

  it('renders the questionNumber CSS properties properly', () => {
    const questionNumber = 1
    expect(
      toJson(
        shallow(
          <StyledAnsweredQuestionNumber
            key={questionNumber}
            onClick={clickHandler}
          />
        ).dive()
      )
    ).toMatchSnapshot()
  })
})
