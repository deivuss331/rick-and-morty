import { createGlobalStyle, DefaultTheme } from 'styled-components';

export default createGlobalStyle<{ theme: DefaultTheme }>`
  html {
    font-family: sans-serif;
    box-sizing: border-box;
    background: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.black};
  }

  * {
    box-sizing: inherit;
  }
  
  ul {
    padding-inline-start: 0;
    list-style-type: none;
  }
  
  p {
    margin: ${({ theme }) => theme.space[2]} 0;
  }
`;
