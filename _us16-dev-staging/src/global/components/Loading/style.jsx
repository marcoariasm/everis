import styled from 'styled-components'

import { allColors } from 'shared/styles'

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 40px;
  justify-items: center;
  align-content: center;
  text-align: center;
  margin: auto auto;
  width: 100%;
  height: 100vh;
  padding: 0 30px;

  .loader {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    position: relative;
    animation: loader-rotate 1s linear infinite;
    top: 50%;
    margin: -28px auto 0;
  }

  .themeInternal {
    border: 8px solid rgba(0, 164, 153, 0.25);
    border-top-color: ${allColors.colorGreen};
  }

  .themeExternal {
    border: 8px solid rgba(255, 79, 0, 0.25);
    border-top-color: ${allColors.colorOrangeMain};
  }

  @keyframes loader-rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
