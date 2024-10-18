export const lightPalette = {
  primary: {
    main: "#fb8500",
    // light: will be calculated from palette.primary.main,
    // dark: will be calculated from palette.primary.main,
    // contrastText: will be calculated to contrast with palette.primary.main
  },
  secondary: {
    main: "#023047",
    light: "#F5EBFF",
    // dark: will be calculated from palette.secondary.main,
    contrastText: "#47008F",
  },
};

export const darkPalette = {
  primary: {
    main: "#bb86fc",
    contrastText: "#000",
  },
  secondary: {
    main: "#03dac6",
    contrastText: "#000",
  },
  error: {
    main: "#cf6679",
    contrastText: "#000",
  },
  warning: {
    main: "#ffb74d",
    contrastText: "#000",
  },
  info: {
    main: "#64b5f6",
    contrastText: "#000",
  },
  success: {
    main: "#81c784",
    contrastText: "#000",
  },
  background: {
    default: "#161616",
    paper: "#1e1e1e",
  },
  text: {
    primary: "#ffffff",
    secondary: "#bbbbbb",
    disabled: "rgba(255, 255, 255, 0.5)",
  },
};

export default { lightPalette, darkPalette };
