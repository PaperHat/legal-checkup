import styled from 'styled-components'
import { DESKTOP, MOBILE, TABLET } from '../../../../../constants'
import styledMap from 'styled-map'

const Wrapper = styled.div`
  width: 738px;
  background-color:#ffffff;
  margin: 0 auto;
  font-family: Helvetica;
  font-size: 16px;
  text-align: center;
  color: #9b9b9b;
  ${styledMap('format', {
    [DESKTOP]: `
    width: 738px;`,
    [MOBILE]: `
    width: 325px;;`,
    [TABLET]: `
    width: 708px;`
  })}
`
Wrapper.displayName = 'Wrapper'

export default Wrapper
