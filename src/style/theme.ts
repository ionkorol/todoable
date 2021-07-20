import { extendTheme } from "native-base";
import { borderColor } from "styled-system";

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      100: "#888888",
      500: "#444444",
      900: "#111111",
    },
    secondary: {
      500: "#666666",
    },
    success: {
      100: "#3291FF",
      500: "#0070F3",
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
      baseStyle: {
      },
      defaultProps: {
        colorScheme: "primary",
        borderColor: 'primary.500'
      }
    },
    Input: {
      baseStyle: {
        outlineColor: "primary.500",
      },
    },
  },
});

export default theme;
