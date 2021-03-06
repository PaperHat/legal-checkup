import * as React from 'react'
import styled from 'styled-components'
import styledMap from 'styled-map'
import {
  DESKTOP,
  MOBILE,
  TABLET,
  RESULT_TOPIC_HEADER_FOREGROUND_BUTTON,
  RESULT_TOPIC_HEADER_BORDER_TOP,
  RESULT_TOPIC_HEADER_BORDER_BOTTOM
} from '../../../constants'

const { useState } = React

const Boundary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Button = styled.button`
  font-family: 'Museo Sans Cyrl 500', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: ${RESULT_TOPIC_HEADER_FOREGROUND_BUTTON};
  background-color: #fff;
  padding: 1px 4px;
  border-style: none;
  &:focus {
    outline: 0;
  }
`

const Header = styled.span`
  font-family: 'Museo Sans Cyrl 900', sans-serif;
  font-weight: 900;
  font-size: ${styledMap('format', {
    [DESKTOP]: '18px',
    [TABLET]: '15px',
    [MOBILE]: '15px'
  })};
  color: #b62645;
`

const CaretDown = styled.span`
  & {
    position: relative;
    width: 8px;
    padding: 0 8px 0 8px;
    margin-left: 4px;
  }
  &:before {
    content: '';
    position: absolute;
    top: 4px;
    left: 0;
    border-top: 8px solid ${RESULT_TOPIC_HEADER_BORDER_TOP};
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
  &:after {
    content: '';
    position: absolute;
    left: 4px;
    top: 4px;
    border-top: 4px solid #fff;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
  }
`

const CaretUp = styled.span`
  & {
    position: relative;
    width: 8px;
    padding: 0 8px 0 8px;
    margin-left: 4px;
  }
  &:before {
    content: '';
    position: absolute;
    top: 4px;
    left: 0;
    border-bottom: 8px solid ${RESULT_TOPIC_HEADER_BORDER_BOTTOM};
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
  &:after {
    content: '';
    position: absolute;
    left: 4px;
    top: 8px;
    border-bottom: 4px solid #ffffff;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
  }
`

export default function ResultTopicHeader (props) {
  const { format, name = '...', onClick, isExpanded } = props
  const [expanded, setExpanded] = useState(isExpanded)
  const showText = expanded ? 'Show Less' : 'Show More'
  const showCaret = expanded ? <CaretUp /> : <CaretDown />

  const btnClicked = () => {
    setExpanded(!expanded)
    onClick()
  }
  return (
    <Boundary>
      <Header format={format}>{name}</Header>
      <Button onClick={btnClicked}>
        {showText}
        {showCaret}
      </Button>
    </Boundary>
  )
}
