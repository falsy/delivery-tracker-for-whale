import * as React from 'react'
import { Global, css } from '@emotion/react'

const Style: React.FC = () => {
  return (
    <Global styles={css`
      ::placeholder {color: #bbb;}

      * {
        box-sizing: border-box;
        user-select: none;
      }
      
      body {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 40px;
        margin: 0;
        background: #f7f7f7;
        font-size: 14px;
      }
      
      #wrap {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
      }

      a {
        text-decoration: none;
        color: inherit;
        letter-spacing: -0.3px;
        transition: all 0.3s;
      }
      
      a:hover {
        text-decoration: underline;
      }
    `} />
  )
}

export default Style