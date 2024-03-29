import { createGlobalStyle } from 'styled-components';
import { pad } from 'components/variables';

export const ResetStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
}
address, caption, cite, code, dfn, em, strong, th, var, b {
  font-weight: normal;
  font-style: normal;
}
abbr, acronym {
  border: 0;
}
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
  display: block;
}
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
html {
  text-size-adjust: 100%;
  box-sizing: border-box;
}
body {
    line-height: 1;
}
ol, ul, li {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote {
  &:before,   &:after {
    content: '';
    content: none;
  }
}
q {
  &:before,   &:after {
    content: '';
    content: none;
  }
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
caption, th {
  text-align: left;
}
textarea {
  resize: none;
}
a {
  text-decoration: none;
  cursor: pointer;
}
button {
  padding: 0;
  border: none;
  background: none;
}
`;

export const GlobalStyle = createGlobalStyle`
body {
  font-family: 'Noto Sans TC', sans-serif;
}

html, body {
  scroll-behavior: smooth;
}

.main-content {
  margin-top: 60px;
  min-height: calc(100vh - 165px);

  @media ${pad} {
    margin-top: 50px;
  }
}

.container {
  width: 100%;
  max-width: 1240px;
  padding-left: 20px;
  padding-right: 20px;
  margin: auto;

  &.smaller {
    max-width: 850px;
  }
}

.toast-txt {
  font-size: 18px;
  font-weight: 500;
}

.confirm-txt {
  padding-top: 20px;
  font-size: 20px;
  font-weight: 500;
}
`;
