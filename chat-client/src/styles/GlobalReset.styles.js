import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background: ${(p) => p.theme.textPrimary};
  }

  * {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 12px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${(p) => p.theme.textPrimary};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${(p) => p.theme.accent};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${(p) => p.theme.primary};
  }
`;
