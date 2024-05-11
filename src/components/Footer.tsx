import * as React from 'react'
import styled from '@emotion/styled'

const Footer: React.FC = () => {
  return (
    <$footer>
      &copy; <a href="https://falsy.me" target="_blank">falsy</a>
    </$footer>
  )
};

export default Footer

const $footer = styled.footer`
  color: #aaa;
  font-size: 12px;
  font-weight: 500;
  position: sticky;
  top: 100%;
  padding: 0 0 15px 20px;
`