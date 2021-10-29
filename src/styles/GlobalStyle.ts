import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${({ theme }) => theme.font.family};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.color.black};
    background-color: ${({ theme }) => theme.color.white};
    height: 100vh;
    padding: 0;
    margin: 0;
  }
`;

export default GlobalStyle;
