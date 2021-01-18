import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  color: #ffffff;
}

html,
body {
  font-size: 1rem;
}

a {
  text-decoration: none;
}
`;

export default GlobalStyles;
