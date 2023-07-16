import { Colors } from "./styled";
import {
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from "styled-components/macro";
import { useMemo } from "react";

function colors(): Colors {
  return {
    bg1: "#d6d6d6",
    bg2: "#e1e1df",
    bg3: "#f5f5f5",
    bg4: "#fff",
    text1: "#424242",
    text2: "#929290",
    text3: "#888886",
    text4: "#c8c8c6",
  };
}

function theme(): DefaultTheme {
  return {
    ...colors(),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  };
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeObject = useMemo(() => theme(), []);

  return (
    <StyledComponentsThemeProvider theme={themeObject}>
      {children}
    </StyledComponentsThemeProvider>
  );
}
