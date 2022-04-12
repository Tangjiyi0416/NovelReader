import React from "react";
import { extendTheme } from "native-base";

export const theme = extendTheme({
  components: {
    Text: {
      baseStyle: {
        _light: {
          color: "myColors.lightText",
        },
        _dark: {
          color: "myColors.darkText",
        },
      },
    },
  },
  colors: {
    primary: {
      50: "#ffe4e4",
      100: "#ffb5b6",
      200: "#f98687",
      300: "#f55656",
      400: "#f12827",
      500: "#d8110e",
      600: "#a90a0a",
      700: "#790506",
      800: "#4a0102",
      900: "#1f0000",
    },
    darkPrimary: {
      50: "#faf4e5",
      100: "#e8dec7",
      200: "#d7c7a7",
      300: "#c8b185",
      400: "#b79b64",
      500: "#9d814a",
      600: "#7b6538",
      700: "#584828",
      800: "#362b16",
      900: "#160d00",
    },
    myColors: {
      light60: "#E8E5D9",
      light30: "#FEFEF8",
      light10: "#BC0B0B",
      lightText: "#131313",
      lightCard: "#F1F0E9",
      dark60: "#222629",
      dark30: "#2F3739",
      dark10: "#DFD2B8",
      darkText: "#FAF7EE",
      darkCard: "#3C413E",
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "light",
  },
});
