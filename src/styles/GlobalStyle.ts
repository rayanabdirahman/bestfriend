import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${({ theme }) => theme.font.family};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.color.black};
  }
`;

export default GlobalStyle;
