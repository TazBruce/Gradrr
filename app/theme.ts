import { extendTheme } from "native-base";

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

const colors = {
  primary: {
    "50": "#c6c6f1",
    "100": "#aaaae6",
    "200": "#8f8fd9",
    "300": "#7777c9",
    "400": "#5a5abe",
    "500": "#5252af",
    "600": "#515199",
    "700": "#4f4f83",
    "800": "#4b4b6f",
    "900": "#47475c",
  },
};

const theme = extendTheme({ colors, config });

export default theme;
