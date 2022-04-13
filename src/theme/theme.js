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
      500: "#BC0B0B",
      700: "#790506",
    },
    darkPrimary: {
      500: "#DFD2B8",
      700: "#b79b64",
    },
    myButton: {
      500: "#CBCBCB00",
      700: "#CBCBCB99",
    },
    myColors: {
      light60: "#E8E5D9",
      light30: "#FEFEF8",
      light10: "#BC0B0B",
      lightText: "#131313",
      lightCard: "#F1F0E9",
      dark60: "#222629",
      dark30: "#424E52",
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
