import { injectGlobal } from "styled-components";
import theme from "config/theme";

import "normalize.css";

injectGlobal`

    html {
        font-size: ${theme.htmlFontSize};
        box-sizing: border-box;
        height: 100%;
    }

    *,
    *::after,
    *::before {
        box-sizing: inherit;
    }

    body, #root {
        height: 100%;
    }

    body {
        font-family: ${theme.fontFamily};
    }

    a {
        color: ${theme.colorBlue};
        font-weight: bold;
        text-decoration: none;
        cursor: pointer;
    }

    hr {
        color: ${theme.colorGray};
    }
`;
