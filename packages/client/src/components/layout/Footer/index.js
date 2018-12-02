import * as React from 'react'

import { COMMUNITY_LAW_URL, PRIVACY_POLICY_PATH, TERMS_OF_USE_PATH } from '../../../state/constants'
import Link from '../../Link'

import Wrapper from './Wrapper'

export default function Footer ({ format }) {
  return (
    <Wrapper format={format}>
      <Link href={COMMUNITY_LAW_URL} format={`${format}Footer`}>
        &copy; 2018 by Community Law Wellington and Hutt Valley
      </Link>
      <Link to={PRIVACY_POLICY_PATH} format={`${format}Footer`}>Privacy Policy</Link>
      <Link to={TERMS_OF_USE_PATH} format={`${format}Footer`}>Terms of Use</Link>
    </Wrapper>
  )
}