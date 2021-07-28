import { ComponentTheme, extendTheme } from "native-base";
import { borderColor } from "styled-system";

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: "#888888",
      100: "#888888",
      200: "#888888",
      300: "#888888",
      400: "#888888",
      500: "#444444",
      600: "#444444",
      700: "#444444",
      800: "#444444",
      900: "#111111",
    },
    secondary: {
      500: "#666666",
    },
    success: {
      50: "#3291FF",
      100: "#3291FF",
      200: "#3291FF",
      300: "#3291FF",
      400: "#3291FF",
      500: "#0070F3",
      600: "#0070F3",
      700: "#0070F3",
      800: "#0070F3",
      900: "#0761D1",
    },
    // error: {
    //   100: "#FF1A1A",
    //   500: "#EE0000",
    //   900: "#C50000",
    // },
    warning: {
      100: "#F7B955",
      500: "#F5A623",
      900: "#AB570A",
    },
    // Redefinig only one shade, rest of the color will remain same.
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "light",
  },
  components: {
    Button: {
      baseStyle: {},
      defaultProps: {},
    },
    Input: {
      baseStyle: {},
    },
    FormControlLabel: {
      baseStyle: {
        _text: {
          color: "muted.500",
          fontSize: "sm",
          bold: true,
          textTransform: "uppercase",
        },
      },
    },
    Avatar: {
      baseStyle: {
        bg: "muted.500",
      },
    },
  },
});

export default theme;
