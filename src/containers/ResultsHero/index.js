import React from 'react'
import { connect } from 'react-redux'

import { getYesAnswerCount } from '@state/selectors'
import StyledResultsHero from '@components/styled/ResultsHero'

function ResultsHero ({ yesCount }) {
  return (
    <StyledResultsHero>
      <p>
        {yesCount > 0
          ? `Based on your answers, a lawyer may be able to help you with...`
          : `Based on your answers, it looks like you're in good legal health! 
        But if you have a problem, or something worrying you that wasn't covered by the questions 
        in this check-up, do come talk to us at Community Law`}
      </p>
      {yesCount > 0 ? <a href='#'>expand</a> : null}
      {yesCount > 0 ? (
        <p>
          You can get free legal advice about these (or any other problem) from
          your local Community Law Centre.
        </p>
      ) : null}
    </StyledResultsHero>
  )
}

function mapStateToProps (state) {
  return {
    yesCount: getYesAnswerCount(state)
  }
}

export default connect(mapStateToProps)(ResultsHero)