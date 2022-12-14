import {createGlobalStyle} from 'styled-components'
import reset from 'styled-reset'

export const supportDeviceSize = 446

export const GlobalStyle = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
    }

    body {
        width: 100vw;
        height: 100vh;
        background: white;
        margin: 0;
        padding: 0;
        font-family: 'SF Pro Display', -apple-system, sans-serif, Roboto;
    }
`
