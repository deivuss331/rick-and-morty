import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    containerSize: string;
    color: {
      black: string;
      white: string;
      accent: string;
    };
    space: {
      1: string;
      2: string;
    };
  }
}
