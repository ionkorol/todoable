import { extendTheme } from "native-base";

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: "#E4E5F1",
      100: "#ccceea",
      200: "#abadd5",
      300: "#8a8dc3",
      400: "#696cb0",
      500: "#5458A0",
      600: "#3d4076",
      700: "#2b2e56",
      800: "#181c36",
      900: "#080819",
    },

    // Redefinig only one shade, rest of the color will remain same.
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "light",
  },
  components: {
    Text: {
      baseStyle: {
        color: "primary.500",
      },
    },
    Heading: {
      baseStyle: {
        color: "primary.500",
      },
      defaultProps: {},
    },
    Button: {
      baseStyle: {
        borderRadius: 10,
      },
      defaultProps: {},
    },
    Input: {
      baseStyle: {
        borderRadius: 10,
        color: "primary.500",
        backgroundColor: "muted.100",
        placeholderTextColor: "primary.200",
        _focus: {
          borderWidth: 0,
        },
        borderWidth: 0,
        fontWeight: "bold",
      },
      defaultProps: {
        isFullWidth: true,
        borderWidth: 0,
        variant: "unstyled",
      },
    },
    IconButton: {
      baseStyle: {
        borderRadius: 10,
      },
      defaultProps: {
        variant: "solid",
      },
      variants: {
        solid: {
          backgroundColor: "primary.50",
          _pressed: {
            backgroundColor: "primary.200",
          },
        },
        link: {
          backgroundColor: "transparent",
          _pressed: {
            backgroundColor: "primary.50",
          },
        },
      },
    },

    Icon: {
      baseStyle: {
        color: "primary.500",
      },
      defaultProps: {},
    },

    FormControlLabel: {
      baseStyle: {
        _text: {
          fontSize: "sm",
          bold: true,
          textTransform: "uppercase",
        },
      },
    },
    FormControlErrorMessage: {
      baseStyle: {
        _text: {
          fontWeight: "bold",
        },
      },
    },
    Avatar: {},
  },
});

export default theme;
