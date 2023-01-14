import { css } from "@emotion/react";

export const contentfulStyles = css`
  word-break: break-word;
  font-size: 0.9rem;

  h1 {
    text-align: left;
    font-size: 1.75rem;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    text-align: left;
    text-transform: none;
    margin-bottom: 5px;
  }

  h2 {
    font-size: 1.35rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  h4 {
    font-size: 1.125rem;
  }

  h5,
  h6 {
    font-size: 1rem;
  }
`;

const fonts = css`
  /* devanagari */
  @font-face {
    font-family: "Rajdhani";
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url("https://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pb0EPOqeef2kg.woff2")
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9,
      U+25CC, U+A830-A839, U+A8E0-A8FB;
  }
  /* latin-ext */
  @font-face {
    font-family: "Rajdhani";
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url("https://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pb0EPOleef2kg.woff2")
      format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF,
      U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Rajdhani";
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url("https://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pb0EPOreec.woff2")
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
      U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Rajdhani";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url("https://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pa8FvOqeef2kg.woff2")
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9,
      U+25CC, U+A830-A839, U+A8E0-A8FB;
  }
  /* latin-ext */
  @font-face {
    font-family: "Rajdhani";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url("https://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pa8FvOleef2kg.woff2")
      format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF,
      U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Rajdhani";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url("https://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pa8FvOreec.woff2")
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
      U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /****************************************************/
  // ROBOTO
  /****************************************************/

  // Normal Regular (400)
  /****************************************************/
  /* cyrillic-ext */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 400;
    src: local("Roboto"), local("Roboto-Regular"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu72xKOzY.woff2")
        format("woff2");
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 400;
    src: local("Roboto"), local("Roboto-Regular"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu5mxKOzY.woff2")
        format("woff2");
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek-ext */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 400;
    src: local("Roboto"), local("Roboto-Regular"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7mxKOzY.woff2")
        format("woff2");
    unicode-range: U+1F00-1FFF;
  }
  /* greek */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 400;
    src: local("Roboto"), local("Roboto-Regular"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4WxKOzY.woff2")
        format("woff2");
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 400;
    src: local("Roboto"), local("Roboto-Regular"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7WxKOzY.woff2")
        format("woff2");
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,
      U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 400;
    src: local("Roboto"), local("Roboto-Regular"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7GxKOzY.woff2")
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF,
      U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 400;
    src: local("Roboto"), local("Roboto-Regular"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2")
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
      U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  // Italic Regular
  /****************************************************/

  /* cyrillic-ext */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: italic;
    font-weight: 400;
    src: local("Roboto Italic"), local("Roboto-Italic"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xFIzIFKw.woff2")
        format("woff2");
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }

  /* cyrillic */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: italic;
    font-weight: 400;
    src: local("Roboto Italic"), local("Roboto-Italic"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xMIzIFKw.woff2")
        format("woff2");
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }

  /* greek-ext */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: italic;
    font-weight: 400;
    src: local("Roboto Italic"), local("Roboto-Italic"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xEIzIFKw.woff2")
        format("woff2");
    unicode-range: U+1F00-1FFF;
  }

  /* greek */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: italic;
    font-weight: 400;
    src: local("Roboto Italic"), local("Roboto-Italic"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xLIzIFKw.woff2")
        format("woff2");
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: italic;
    font-weight: 400;
    src: local("Roboto Italic"), local("Roboto-Italic"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xHIzIFKw.woff2")
        format("woff2");
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,
      U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: italic;
    font-weight: 400;
    src: local("Roboto Italic"), local("Roboto-Italic"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xGIzIFKw.woff2")
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF,
      U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: italic;
    font-weight: 400;
    src: local("Roboto Italic"), local("Roboto-Italic"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xIIzI.woff2")
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
      U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  // Normal Medium (500)
  /****************************************************/

  /* cyrillic-ext */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 500;
    src: local("Roboto Medium"), local("Roboto-Medium"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fCRc4EsA.woff2")
        format("woff2");
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 500;
    src: local("Roboto Medium"), local("Roboto-Medium"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fABc4EsA.woff2")
        format("woff2");
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek-ext */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 500;
    src: local("Roboto Medium"), local("Roboto-Medium"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fCBc4EsA.woff2")
        format("woff2");
    unicode-range: U+1F00-1FFF;
  }
  /* greek */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 500;
    src: local("Roboto Medium"), local("Roboto-Medium"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBxc4EsA.woff2")
        format("woff2");
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 500;
    src: local("Roboto Medium"), local("Roboto-Medium"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fCxc4EsA.woff2")
        format("woff2");
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,
      U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 500;
    src: local("Roboto Medium"), local("Roboto-Medium"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fChc4EsA.woff2")
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF,
      U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 500;
    src: local("Roboto Medium"), local("Roboto-Medium"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc4.woff2")
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
      U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  // Normal Bold (700)
  /****************************************************/

  /* cyrillic-ext */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 700;
    src: local("Roboto Bold"), local("Roboto-Bold"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCRc4EsA.woff2")
        format("woff2");
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 700;
    src: local("Roboto Bold"), local("Roboto-Bold"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfABc4EsA.woff2")
        format("woff2");
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek-ext */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 700;
    src: local("Roboto Bold"), local("Roboto-Bold"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCBc4EsA.woff2")
        format("woff2");
    unicode-range: U+1F00-1FFF;
  }
  /* greek */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 700;
    src: local("Roboto Bold"), local("Roboto-Bold"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBxc4EsA.woff2")
        format("woff2");
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 700;
    src: local("Roboto Bold"), local("Roboto-Bold"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCxc4EsA.woff2")
        format("woff2");
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,
      U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 700;
    src: local("Roboto Bold"), local("Roboto-Bold"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfChc4EsA.woff2")
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF,
      U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Roboto";
    font-display: swap;
    font-style: normal;
    font-weight: 700;
    src: local("Roboto Bold"), local("Roboto-Bold"),
      url("https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4.woff2")
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
      U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
`;

export default fonts;
