import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

html,
body {
  font-size: 1rem;
  color: #ffffff;
  background-color: #222222;
}

a {
  text-decoration: none;
}

h1, h2 {
  margin-top: 1rem;
  margin-left:110px;
}

ul {
  list-style: none;
}

`;

export default GlobalStyles;
