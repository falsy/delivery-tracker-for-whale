import * as React from 'react'
import styled from '@emotion/styled'

const S_Footer = styled.footer`
  color: #444;
  font-size: 11px;
  font-weight: bold;
  position: fixed;
  bottom: 15px;
  left: 20px;
`

const Footer: React.FC = () => {
  return (
    <S_Footer>
      &copy; <a href="https://falsy.me" target="_blank">falsy</a>
    </S_Footer>
  )
};

export default Footer