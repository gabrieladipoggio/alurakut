
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle`
  /* Reset CSS */

  * {
    margin:0;
    padding:0;
    box-sizing: border-box;
  }

 
  body {
    background-color: #D9E6F6;
    font-family: sans-serif;
  }

  #__next{
    display:flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .expandLink{
    font-size: 14px;
    color: #2E7BB4;
    -webkit-text-decoration: none;
    text-decoration: none;
    font-weight: 600;
    justify-content: flex-start;
    position: relative;
    top: 5px
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: 'red',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
