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
  margin-top: 2rem;
  margin-left:110px;

  @media only screen and (max-width: 450px) {
    font-size: 1.5rem;
    margin-left: 70px;
    margin-right: 1rem;
  }
}

h3 {
  margin-top: 0.5rem;
  margin-left:110px;

  @media only screen and (max-width: 450px) {
    margin-left: 70px;
    font-size: 1rem;
  }
}


ul {
  list-style: none;
}

`;

export default GlobalStyles;
