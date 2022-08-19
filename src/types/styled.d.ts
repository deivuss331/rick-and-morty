import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    containerSize: string;
    color: {
      black: string;
      white: string;
      grey: string;
      accent: string;
    };
    space: {
      1: string;
      2: string;
    };
    zIndex: {
      screenSizeLoader: number;
    };
  }
}
